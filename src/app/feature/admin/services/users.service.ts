import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/services/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // userDetails:User;
  userDetails: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }

  set userDetailsValue(value) {
    this.userDetails.next(value);
  }

  getUserList(): Observable<any> {
    return this.http.get('https://nodejs-fb-app.herokuapp.com/users')
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  findUserById(userId: any): Observable<any> {
    return this.http.get('https://nodejs-fb-app.herokuapp.com/users/' + userId)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }
  updateUserById(userId:any,updatedForm:any):Observable<any>{
    return this.http.put('https://nodejs-fb-app.herokuapp.com/users/' + userId,updatedForm)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }
}
