import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<User[]|User>();
  private users: User[] | User;

  constructor(private http: HttpClient) { }

  public emitUserSubject() {
    this.userSubject.next(this.users);
  }

  public async getOne(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/user/' + id).subscribe(
        (user: User) => {
          this.users = user;
          this.emitUserSubject();
          resolve(this.users);
        },
        (error: any) => reject(error)
      )
    })
  }

  public async update(id: number, name: string, first_name: string, avatar: File = null) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('user', JSON.stringify({name: name, first_name: first_name}));
      formData.append('avatar', avatar)
      this.http.put('http://localhost:3000/api/user/' + id, formData).subscribe(
        (id: number) => {
          this.getOne(id)
          .then((user: User) => resolve(user))
          .catch((error: any) => reject(error))
        },
        (error: string) => reject(error)
      )
    })
  }

  public async delete(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/user/' + id).subscribe(
        (data: string) => resolve(data),
        (error: any) => reject(error)
      )
    })
  }

  public async promoteAdmin(id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/admin', {userId: id}).subscribe(
        (data: string) => {
          this.getOne(id)
            .then(() => resolve(data))
            .catch((error: any) => reject(error))
          
        },
        (error: any) => reject(error)
      )
    })
  }

  public async removeAdmin(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/admin/' + id).subscribe(
        (data: string) => {
          this.getOne(id)
            .then(() => resolve(data))
            .catch((error: any) => reject(error))
        },
        (error: any) => reject(error)
      )
    })
  }

}
