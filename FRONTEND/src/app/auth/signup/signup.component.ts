import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passwordConfirm } from 'src/app/validators/passwordConfirm.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle("Groupomania - Inscription");

    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern("^[a-zA-Z\- ']+$"), Validators.maxLength(20)]],
      first_name: [null, [Validators.required, Validators.pattern("^[a-zA-Z\- ']+$"), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirm: [null, [Validators.required, Validators.minLength(6)]]
    },
    {validator: passwordConfirm('password', 'password_confirm')}
  )}

  onSignup() {
    const name = this.signupForm.get('name').value;
    const first_name = this.signupForm.get('first_name').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.auth.signup(name, first_name, email, password)
      .then(() => {
        this.auth.login(email, password)
          .then(() => {this.router.navigate(['index'])})
          .catch((error) => this.error = error.message);
      })
      .catch(error => {
        if(error.error.type == "unique violation") {
          this.error = "Cette adresse email existe déjà !"
        }
        else {
          this.error = "Une erreur est survenue"
        }
      })
  }
}
