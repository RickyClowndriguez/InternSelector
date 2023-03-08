import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from './models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }


  //get a list of all users (will probably be removed)
  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //get list of all usernames
  getAllUsernames(): Observable<String[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(users => users.map(user => user.name))
    );
  }

  //get user information by id
  getUserById(userid: String): Observable<User> {
      return this.http.get<any>(`${this.apiUrl}/${userid}`).pipe(
        tap(response => console.log(response)),
        map(response => {
          const user = new User(
            response._id,
            response.name,
            response.champion,
            response.lobby
          );
          return user;
        }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  //create a new user
  addUser(username: String): Observable<any> {
      const user = { name: username };
      return this.http.post<any>(`${this.apiUrl}`, user).pipe(
        tap(response => console.log(response)),
        map(response => {
          const user = new User(
            response._id,
            response.name,
            response.champion,
            response.lobby
          );
          return user;
        }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );;
  }

  //create a new user given a lobby
  addUserWithLobby(username: String, lobbyid: String): Observable<any> {
    const user = { name: username , lobby: lobbyid};
    return this.http.post<any>(`${this.apiUrl}`, user);
  }

  //remove a username by id
  removeUser(id: String): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      catchError(error => {
        console.log(error);
        return error;
      })
    );
  }
       
  
}
