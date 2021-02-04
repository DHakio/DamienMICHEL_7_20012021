import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './index/index.component';
import { AddPostComponent } from './post/add/add.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'login', component: ConnexionComponent, canActivate: [NotAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard]},
  {path: 'create-post', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'index'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
