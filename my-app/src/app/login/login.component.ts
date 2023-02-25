import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernames: string[] = ['Hugo'];
  username: string = '';
  team: string = '1';
  status: string ='online';
  errorMessage: string ='';

  constructor(private userService: UserService, 
    private router: Router) {}

  onSubmit() {
    // add username to database
    this.userService.addUser(this.username, this.team, 'online').subscribe(
      () => {
        //store username on client side
        localStorage.setItem('username', this.username);
        console.log('User added successfully!');
        //update database
        this.userService.getUsernames().subscribe(
          usernames => this.usernames = usernames
        );
        //navigate to selection
        this.router.navigate(['/selection']);
      },
      error => {
        console.error(error);
        this.errorMessage = error;
      }
    );
  

  }

  ngOnInit() {
    console.log('usernames should be displayed here')

    this.userService.getUsernames().subscribe(
      usernames => this.usernames = usernames
    );
    
    console.log(this.usernames);
  }
  
}
