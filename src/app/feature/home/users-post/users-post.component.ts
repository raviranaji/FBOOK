import { Component, OnInit } from '@angular/core';
import { UsersPostService } from '../services/users-post.service';
import { Post } from '../../admin/services/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.css']
})
export class UsersPostComponent implements OnInit {

  postList: Post[];
  postMsg: string = "";
  postForm: Post;
  constructor(private usersPostService: UsersPostService,private authService:AuthService,private alertService:AlertService) { }

  ngOnInit(): void {

    this.usersPostService.getAllPosts()
      .subscribe((res: any) => {
        this.postList = res;
        console.log("All Post : " + this.postList);
      });
  }

  createPost(): void {
    this.alertService.clear();
    console.log(this.postMsg);
    if(this.postMsg === ""){
      alert("Please Enter Post");
      return
    }
    let date = new Date();
    this.postForm = {
      isAdmin: this.authService.getUserDetails().isAdmin,
      isActive: this.authService.getUserDetails().isActive,
      _id: this.authService.getUserDetails()._id,
      post: this.postMsg,
      profession: '',
      userId: this.authService.getUserDetails()._id,
      userName: this.authService.getUserDetails().firstName +" "+this.authService.userDetails.lastName,
      userPhotoId: this.authService.getUserDetails().photoId,
      createdDate: date.toDateString()     
    };
    console.log(JSON.stringify(this.postForm));
    this.usersPostService.createPost(this.postForm).subscribe((res: any) => {
      console.log(res);
      this.postMsg="";
      this.alertService.success(res.message, true);
    });

  }
  
}
