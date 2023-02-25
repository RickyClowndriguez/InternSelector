import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {}

  ngOnInit() {
    window.addEventListener('unload', () => {
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
      }
    });
  }
}
