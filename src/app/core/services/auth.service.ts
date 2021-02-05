import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: Subject<any> = new Subject<any>();

  isAdminLogged: Subject<any> = new Subject<any>();

  userDetails: User;

  constructor(private http: HttpClient) { 
  
  }

  // registering account
  signup(formData: any): Observable<any> {
    console.log(formData);
    return this.http.post('https://nodejs-fb-app.herokuapp.com/users/register', formData)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  login(formData: any): Observable<any> {
    console.log(formData);
    return this.http.post('https://nodejs-fb-app.herokuapp.com/users/authenticate', formData)
      .pipe(map((res: any) => {
        console.log(res);
        this.userDetails = res;
        console.log("\nid - " + this.userDetails._id +
          "\ncreatedDate - " + this.userDetails.createdDate +
          "\ndob - " + this.userDetails.dob +
          "\nemail - " + this.userDetails.email +
          "\nfirstName - " + this.userDetails.firstName +
          "\ngender - " + this.userDetails.gender +
          "\nisActive - " + this.userDetails.isActive +
          "\nisAdmin - " + this.userDetails.isAdmin +
          "\nlastName - " + this.userDetails.lastName +
          "\nphotoId - " + this.userDetails.photoId +
          "\ntoken - " + this.userDetails.token
        );

        return res;
      }));
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  saveUserDetails(user: string): void {
    sessionStorage.setItem('userDetails', JSON.stringify(user));
  }

  saveAdmin(isAdmin: string): void {
    sessionStorage.setItem('isAdmin', isAdmin);
  }

  isAuth(): boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem('isAdmin') === 'true') {
      return true;
    } else {
      return false;
    }
  }


  // todo: complete the logout from header.comp.ts
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userDetails');
  }

  set isLoggedInValue(value) {
    this.isLoggedIn.next(value);
  }

  set isAdminLoggedValue(value) {
    this.isAdminLogged.next(value);
  }

  getUserDetails():User{    
    let user:User =JSON.parse(sessionStorage.getItem('userDetails'));
    return user;
   
  }
}
