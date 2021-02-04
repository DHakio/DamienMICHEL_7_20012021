import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {


  post: Post;
  error: string;
  toggleUpdate: boolean = false;
  postSubscription: Subscription;
  postForm: FormGroup
  edited: Date;
  selfOrAdmin: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.postSubscription = this.postService.postSubject.subscribe(
          post => {
            this.post = post[0];

            this.postForm = this.formBuilder.group({
              title: [null, Validators.required],
              content: [null, Validators.required]
            });
            this.postForm.controls["title"].setValue(this.post.title);
            this.postForm.controls["content"].setValue(this.post.content);

            if(this.post.createdAt != this.post.updatedAt) {
              this.edited = this.post.updatedAt;
            }

            if(this.auth.getIsAdmin() || this.post.UserId == this.auth.getUserId()) {
              this.selfOrAdmin = true;
            }
          },
          error => this.error = JSON.stringify(error)
        )
        this.postService.getOne(params.id);
      },
      error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  
  public async onSubmit() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;

    this.postService.update(this.post.id, title, content)
      .then(() => {
        this.toggleUpdate = false;
        this.postForm.controls["title"].setValue(this.post.title);
        this.postForm.controls["content"].setValue(this.post.content);
      })
      .catch(() => this.error = "Une erreur est survenue")
  }
  
  public async onDelete() {
    this.postService.delete(this.post.id)
      .then(() => {this.router.navigate(['']);})
      .catch(() => this.error = "Une erreur est survenue")
  }

  public onToggleUpdate() {
    this.toggleUpdate = !this.toggleUpdate;
  }
  
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
