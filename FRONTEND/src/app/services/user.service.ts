import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<User[]>();
  private users: User[];

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  public emitUserSubject() {
    this.userSubject.next(this.users);
  }

  public async getOne(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/user/' + id).subscribe(
        (data: {user: User[]}) => {
          this.users = data.user;
          this.emitUserSubject();
          resolve(this.users);
        },
        (error: any) => reject(error)
      )
    })
  }

  public async update(id: number, name: string, first_name: string) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/user/' + id, {name: name, first_name: first_name}).subscribe(
        (data: {message: string}) => {
          this.getOne(id)
            .then(() => resolve(data.message))
            .catch((error: any) => reject(error))
        },
        (error: {message: string}) => reject(error.message)
      )
    })
  }

  public async delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/user/' + id).subscribe(
        (data: {message: string}) => resolve(data.message),
        (error: any) => reject(error)
      )
    })
  }
}
