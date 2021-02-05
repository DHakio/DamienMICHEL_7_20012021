import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-addComment',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class addCommentComponent implements OnInit {

  commentForm: FormGroup;
  post_id: number;
  error: string;
  success: string

  constructor(private formBuilder: FormBuilder, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group(
      {content: [null, [Validators.required, Validators.maxLength(255)]] }
    )

    this.route.params.subscribe(
      params => this.post_id = params.id,
      error => this.error = JSON.stringify(error)
      
    )
  }

  public async onSubmit() {
    const content = this.commentForm.get('content').value;

    if(this.commentForm.valid) {
      this.postService.addComment(this.post_id, content)
        .then((message: string) => {
          this.success = message;
          this.commentForm.reset();
        })
        .catch(() => this.error = "Une erreur est survenue");
    }

  }

}
