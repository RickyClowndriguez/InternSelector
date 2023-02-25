import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsernames(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.map(user => user.username))
    );
  }

  getUsersWithTeamAndStatus(): Observable<any[]> {
    return this.getUsers().pipe(
      map(users => users.map(user => {
        return {
          username: user.username,
          team: user.team,
          status: user.status
        };
      }))
    );
  }

  addUser(username: string, team: string, status: string): Observable<any> {
    return this.getUsernames().pipe(
      switchMap(usernames => {
        if (usernames.includes(username)) {
          return throwError('Username already taken');
        } else {
          const user = { username, team, status };
          return this.http.post<any>(this.apiUrl, user);
        }
      })
    );
  }

  removeUser(username: string): Observable<any> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.username === username)),
      map(user => {
        if (user) {
          const url = `${this.apiUrl}/${user.id}`;
          return this.http.delete(url);
        } else {
          return null;
        }
      })
    );
  }
}
