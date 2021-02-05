import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../admin/services/post';

@Injectable({
  providedIn: 'root'
})
export class UsersPostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get('https://nodejs-fb-app.herokuapp.com/posts')
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  createPost(post : Post): Observable<any> {
    return this.http.post('https://nodejs-fb-app.herokuapp.com/posts/createpost',post)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }
}
