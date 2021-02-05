import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private http: HttpClient) { }

  getAllFriends(): Observable<any> {
    return this.http.get('https://nodejs-fb-app.herokuapp.com/friends')
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

}
