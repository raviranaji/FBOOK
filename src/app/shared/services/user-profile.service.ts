import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient ) { }

  getProfilePic(photoId:string): Observable<Blob> {
    return this.http.get('https://nodejs-fb-app.herokuapp.com/files/'+photoId,{responseType: 'blob'})
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  findPostByUserId(userId:string): Observable<any> {
    return this.http.post('https://nodejs-fb-app.herokuapp.com/posts/findpostbyuserid',userId)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }
}
