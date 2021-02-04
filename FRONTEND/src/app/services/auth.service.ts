import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthSubject = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: number;
  private isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  public async signup(name: string, first_name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signup', {name: name, first_name: first_name, email: email, password: password}).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      )
    })
  }

  public getToken() {
    return this.authToken;
  }

  public getUserId() {
    return this.userId;
  }

  public getIsAdmin() {
    return this.isAdmin;
  }

  public async adminCheck(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/admin/check/' + id).subscribe(
        (data: {isAdmin: boolean}) => {
          this.isAdmin = data.isAdmin;
          resolve(data.isAdmin)
        },
        (error: any) => reject(error)
      )
    })
  }

  public async login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/login', {email: email, password: password}).subscribe(
        (data: {userId: number, admin: boolean, token: string}) => {
          this.userId = data.userId;
          this.authToken = data.token;
          this.isAdmin = data.admin;
          this.isAuthSubject.next(true);
        },
        error => {
          reject(error);
        }
      )
    })
  }

  public logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuthSubject.next(false);
    this.router.navigate(['login']);
  }
}
