import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {} as User;
  usernames: String[] = [];
  errorMessage: String = '';
  

  constructor(private userService: UserService, 
    private router: Router) {}

  onSubmit() {
    // add username to database
    this.userService.addUser(this.user.name).subscribe(user => {
      this.user = user;
      //log the lobbyid for debugging
      console.log(this.user.id);
      //store username and id on client side
      localStorage.setItem("username", this.user.name as string);
      localStorage.setItem("userid", this.user.id as string);
      console.log('User added successfully!');
      //navigate to selection
      //this.router.navigate(['/selection']);


      // catch error?!
    });
  

  }

  ngOnInit() {
    console.log('usernames should be displayed here')

    this.userService.getAllUsernames()
    .subscribe(usernames => {
      this.usernames = usernames;
    });
    
    console.log(this.usernames);
  }
  
}
