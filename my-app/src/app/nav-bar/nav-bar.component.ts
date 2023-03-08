import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  username: string = '';
  userid: string ='';

  constructor(private userService: UserService) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      this.userid = storedUserid;
    }
  }

  onLogout() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.userService.removeUser(storedUsername).subscribe(
        () => {
          console.log('User removed successfully!');
        },
        error => {
          console.error(error);
        }
      );
      localStorage.removeItem('username');
      this.username = '';
    }
  }
}

