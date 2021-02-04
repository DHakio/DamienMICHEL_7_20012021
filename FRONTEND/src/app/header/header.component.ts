import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSubscription: Subscription;
  userId: number;
  isAdmin: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.isAuthSubject.subscribe(isAuth => {
      this.isAuth = isAuth;
      this.isAdmin = this.auth.getIsAdmin();
      this.userId = this.auth.getUserId();
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
