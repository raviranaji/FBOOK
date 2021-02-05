import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthGuard } from './core/services/guards/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { SignupComponent } from './feature/auth/components/signup/signup.component';
import { ForgotPasswordComponent } from './feature/auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './feature/auth/components/reset-password/reset-password.component';
import { FriendRequestComponent } from './feature/network/friend-request/friend-request.component';
import { FriendComponent } from './feature/friend/friend.component';
import { UsersComponent } from './feature/admin/users/users.component';
import { ProfileSettingComponent } from './feature/setting/profile-setting/profile-setting.component';

const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'friend-request', component: FriendRequestComponent, canActivate: [ AuthGuard ] },
  { path: 'friends', component: FriendComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'setting', component: ProfileSettingComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
