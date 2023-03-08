import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LobbyService } from '../lobby.service';
import { UserService } from '../user.service';
import { Lobby } from '../models/lobby';
import { User } from '../models/user';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  //variable for lobby 
  lobby: Lobby = {} as Lobby;
  usernames: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private lobbyService: LobbyService,
    private userService: UserService
  ) { }

  
  joinLobby() {

  }

  ngOnInit(): void {
    //get the lobby id from the page
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.lobbyService.getLobbyById(id).subscribe(lobby => {
      this.lobby = lobby;
      //log the lobbyid for debugging
      console.log(this.lobby.id);
          //populate the list of the lobbys users
      for(var userid of this.lobby.users){
          //use service to get users names
          var tempuser = {} as User;
          this.userService.getUserById(userid).subscribe(user => {
          tempuser = user;
          this.usernames.push(tempuser.name);
          console.log(tempuser.name);
        });
        
      }
    });
   

  }
}