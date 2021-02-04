import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../models/Comment.model';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  error: string;
  toggleUpdate: boolean = false;
  commentForm: FormGroup;
  edited: Date;
  selfOrAdmin: boolean = false;

  constructor(private postService: PostService, private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    
    this.commentForm = this.formBuilder.group(
      {content: [null, Validators.required] }
    )
    this.commentForm.controls["content"].setValue(this.comment.content);

    if(this.auth.getIsAdmin() || this.auth.getUserId() == this.comment.UserId) {
      this.selfOrAdmin = true;
    }
    if(this.comment.createdAt != this.comment.updatedAt) {
      this.edited = this.comment.updatedAt;
    }
  }

  public async onDelete() {
    this.postService.deleteComment(this.comment.id)
      .then()
      .catch(() => this.error = "Une erreur est survenue")
  }

  public async onToggleUpdate() {
    this.toggleUpdate = !this.toggleUpdate;

  }

  public async onSubmit() {
    const content = this.commentForm.get('content').value;
    this.postService.updateComment(this.comment.id, content)
      .then(() => {
        this.toggleUpdate = false; 
        this.commentForm.reset();
        this.commentForm.controls["content"].setValue(this.comment.content);
      })
      .catch(() => this.error = "Une erreur est survenue")
  }

  public onPressEnter(e: KeyboardEvent) {
    if(e.code == 'Enter') {
      this.onSubmit();
    }
  }
}
