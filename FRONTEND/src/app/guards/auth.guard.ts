import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return Observable.create(
      observer => {
        this.auth.isAuthSubject.subscribe(
          auth => {
            if (auth) {
              observer.next(true);
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    );
  }
}
