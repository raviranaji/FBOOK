import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FriendRequestService } from 'src/app/feature/network/friend-request/friend-request.service';
import { UsersPostService } from 'src/app/feature/home/services/users-post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageBlobUrl: any;
  postCount: number;
  totalConnection: number;

  constructor(private userProfileService: UserProfileService,
    private authService: AuthService,
    private friendReqService: FriendRequestService,
    private usersPostService : UsersPostService) { }


  ngOnInit(): void {
    this.getProfilePic();
    // this.findPostByUserId();
    this.getAllPosts();
    this.getAllFriends();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  findPostByUserId(): void {
    this.userProfileService.findPostByUserId(this.authService.getUserDetails()._id)
      .subscribe((res: any) => {
        console.log(res);
        this.postCount = res.length;
      });
  }

  getAllPosts() {
    this.usersPostService.getAllPosts()
      .subscribe((res: any) => {
        this.postCount = res.length;
        console.log("All Post : " + res);
      });
  }


  getProfilePic(): void {
    this.userProfileService.getProfilePic(this.authService.getUserDetails().photoId)
      .subscribe((res: Blob) => {
        console.log(res);
        this.createImageFromBlob(res);
      });
  }

  getAllFriends() {
    this.friendReqService.getAllFriends()
      .subscribe((res: any) => {
        this.totalConnection = res.length;
      });
  }
}
