import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-addPost',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private postService: PostService , private router: Router) { }

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  public async onSubmit() {
    const title = this.addPostForm.get('title').value;
    const content = this.addPostForm.get('content').value;

    this.postService.add(title, content).then(
      (data: any) => {this.router.navigate(['/post/' + data.id]);}
    )
    .catch(() => this.error = "Une erreur est survenue");
  }

}
