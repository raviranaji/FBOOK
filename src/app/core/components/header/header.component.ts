import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isLoggedInSubscription: Subscription;
  isAdminLoggedSubscription: Subscription;
  userActionsList: any;
  menuList;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("menu " + JSON.stringify(this.userActionsList));
    this.menuList = this.userActionsList

    // if (this.authService.isAuth()) {      
    //   this.isLoggedIn = true;
    // }
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });

    // if (this.authService.isAdmin()) {      
    //   this.isAdmin = true;
    // }

    this.isAdminLoggedSubscription = this.authService.isAdminLogged.subscribe(val => {
      this.isAdmin = val;

      this.userActionsList = [
        { buttonName: 'Home', url: '/home', clicked: true, isAdmin: true },
        { buttonName: 'Users', url: '/users', clicked: false, isAdmin: this.isAdmin },
        { buttonName: 'Network', url: '/friend-request', clicked: false, isAdmin: true },
        { buttonName: 'Friends', url: 'friends', clicked: false, isAdmin: true },
        { buttonName: 'Setting', url: '/setting', clicked: false, isAdmin: true },
        { buttonName: 'Logout', url: '', clicked: false, isAdmin: true },

      ]
    });

    // this.hideUserTab();
  }

  logout(data) {
    console.log("logout from application");
    if (data.buttonName === 'Logout') {
      this.authService.logout();
      this.authService.isLoggedInValue = false;
      this.authService.isAdminLoggedValue = false;
      this.router.navigate(['/login']);
    } else {
      this.userActionsList.forEach(element => {
        if (element.buttonName === data.buttonName) {
          element.clicked = true;
        } else {
          element.clicked = false;
        }
      })
    }


  }

  logOut() {
    this.authService.logout();
    this.authService.isLoggedInValue = false;
    this.authService.isAdminLoggedValue = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.isAdminLoggedSubscription.unsubscribe();
  }

  hideUserTab = () => {
    if (!this.isAdmin) {
      this.userActionsList.splice(1, 1);
    } else {
      this.userActionsList = this.menuList
    }

  }
}
