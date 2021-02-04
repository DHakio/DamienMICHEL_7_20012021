import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-postList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSubscription: Subscription;
  error: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postSubscription = this.postService.postSubject.subscribe(
      posts => {
        this.posts = posts;
        this.error = null;
      },
      error => {this.error = JSON.stringify(error)}
    )
    this.postService.getAll();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}


