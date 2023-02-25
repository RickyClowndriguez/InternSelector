import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {
  users1: any[] = [];
  users2: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsersWithTeamAndStatus().subscribe(
      users => {
        this.users1 = users.filter(user => user.team === '1');
        this.users2 = users.filter(user => user.team === '2');
      },
      error => {
        console.error(error);
        this.errorMessage = error;
      }
    );
  }
}
