import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { AuthService } from './auth.service';
import { Comment } from '../models/Comment.model';
import { UserService } from './user.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postSubject = new Subject<Post[]>();
  private posts: Post[];

  constructor(private http: HttpClient, private auth: AuthService, private user: UserService) { }

  public emitPostSubject() {
    this.postSubject.next(this.posts);
  }

  public async getAll() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post')
      .subscribe((data: any) => {
          this.posts = data.posts;
          this.emitPostSubject();
          resolve(data.posts);
        },
        error => {reject(error);}
      )
    })
    
  }

  public async getOne(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post/' + id).subscribe(
        (data: {post: Post[]}) => {
          this.posts = data.post;
          this.emitPostSubject();
          resolve(data.post);
        },
        (error: any) => reject(error)
      )
    })
      
  }

  public async add(title: string, content: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/post', {title: title, content: content, user_id: this.auth.getUserId()}).subscribe(
        (data: {message: string, post: Post}) => {
          this.emitPostSubject();
          resolve(data.post);
        },
        (error: any) => {
          reject(error);
        })
    })
  }

  public async update(id: number, title: string, content: string) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/post/' + id, {title: title, content: content}).subscribe(
        (data: {message: string}) => {
          this.getOne(id)
            .then(() => resolve(data.message))
            .catch((error: any) => reject(error))
        },
        (error: any) => {
          reject(error);
        })
    })
  }

  public async delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/post/' + id).subscribe(
        (data: {message: string}) => {
          this.emitPostSubject();
          resolve(data.message);
        },
        (error: any) => {
          reject(error);
        })
    })
  }

  public async addComment(post_id: number, content: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/comment', {post_id: post_id, content: content, user_id: this.auth.getUserId()}).subscribe(
        (data: {message: String}) => {
          this.getOne(this.posts[0].id)
            .then(() => resolve(data.message))
            .catch((error: any) => reject(error))
          ;
        },
        (error: any) => reject(error)
      );
    })
    
  }

  public async updateComment(id: number, content: string) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/comment/' + id, {content: content}).subscribe(
        (data: {message: string}) => {
          this.getOne(this.posts[0].id)
            .then(() => resolve(data.message))
            .catch((error: any) => reject(error))
        },
        (error: any) => reject(error)
      )
    })
  }

  public async deleteComment(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/comment/' + id).subscribe(
        (data: {message: string}) => {
          this.getOne(this.posts[0].id)
            .then(() => resolve(data.message))
            .catch((error: any) => reject(error));
        },
        (error: any) => reject(error)
      )
    })
  }
}
