import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './post/add/add.component';
import { CommentComponent } from './comment/comment.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post/list/list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addCommentComponent } from './comment/add/add.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    SignupComponent,
    IndexComponent,
    ProfileComponent,
    PostComponent,
    AddPostComponent,
    CommentComponent,
    HeaderComponent,
    PostListComponent,
    addCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [
    Title,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
