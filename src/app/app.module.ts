import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { SignupComponent } from './feature/auth/components/signup/signup.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { ResetPasswordComponent } from './feature/auth/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './feature/auth/components/forgot-password/forgot-password.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { UsersPostComponent } from './feature/home/users-post/users-post.component';
import { FriendRequestComponent } from './feature/network/friend-request/friend-request.component';
import { FriendComponent } from './feature/friend/friend.component';
import { ProfileSettingComponent } from './feature/setting/profile-setting/profile-setting.component';
import { UsersComponent } from './feature/admin/users/users.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderInterceptorServiceInterceptor } from './core/services/interceptors/loader-interceptor-service.interceptor';
import { AlertComponent } from './core/components/alert/alert.component';
import { ErrorInterceptor } from './core/services/interceptor/error.interceptor';
import { PopupComponent } from './shared/components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    UsersPostComponent,
    FriendRequestComponent,
    FriendComponent,
    ProfileSettingComponent,
    UsersComponent,
    LoaderComponent,
    AlertComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorServiceInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
