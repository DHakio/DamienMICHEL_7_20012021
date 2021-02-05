import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userSubscription: Subscription
  error: string;
  user: User;
  self: boolean;
  admin: boolean;
  toggleUpdate: boolean;
  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private auth: AuthService, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.userSubscription = this.userService.userSubject.subscribe(
          (user: User) => {
            this.user = user;
            this.admin = this.auth.getIsAdmin();
            this.self = this.auth.getUserId() == params.id
            this.titleService.setTitle(`Groupomania - Profile de ${this.user.first_name} ${this.user.name}`);
            this.profileForm = this.formBuilder.group({
              name: [null, [Validators.required, Validators.pattern("^[a-zA-Z\- ']+$"), Validators.maxLength(20)]],
              first_name: [null, [Validators.required, Validators.pattern("^[a-zA-Z\- ']+$"), Validators.maxLength(20)]]
            })
          },
          (error: string) => this.error = JSON.stringify(error)
        )
        this.userService.getOne(params.id)
      },
      (error: string) => this.error = JSON.stringify(error)
    )
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public onToggleUpdate() {
    if(this.admin || this.self) {
      this.toggleUpdate = !this.toggleUpdate;
      this.profileForm.controls["first_name"].setValue(this.user.first_name);
      this.profileForm.controls["name"].setValue(this.user.name);
    }

  }

  public onSubmit() {
    if(this.admin || this.self) {
      const name = this.profileForm.get('name').value;
      const first_name = this.profileForm.get('first_name').value;

      if(this.profileForm.valid) {
        this.userService.update(this.user.id, name, first_name)
          .then(() => {
            this.toggleUpdate = false;
            this.profileForm.controls["first_name"].setValue(this.user.first_name);
            this.profileForm.controls["name"].setValue(this.user.name);
          })
          .catch(() => this.error = "Une erreur est survenue")
      }
    }
  }

  public async onDelete() {
    if(this.admin || this.self) {
      this.userService.delete(this.user.id)
        .then(() => {
          if(this.user.id == this.auth.getUserId()) {
            this.auth.logout()
          }
          else {
            this.router.navigate(['/index']);
          }
        })
        .catch(() => this.error = "Une erreur est survenue")
    } 
  }

  public async onPromoteAdmin() {
    if(this.admin && !this.user.admin) {
      this.userService.promoteAdmin(this.user.id)
        .catch(() => this.error = "Une erreur est survenue")
    }
  }

  public async onRemoveAdmin() {
    if(this.admin && !this.self) {
      this.userService.removeAdmin(this.user.id)
        .then(() => {
          if(this.auth.getUserId() == this.user.id) {
            this.auth.logout();
          }
        })
        .catch(() => this.error = "Une erreur est survenue")
    }
  }
}
