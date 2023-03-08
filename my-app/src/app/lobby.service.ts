import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { Lobby } from './models/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private apiUrl = 'http://localhost:8080/api/lobbys';

  constructor(private http: HttpClient) { }


  //get a list of all lobbys (will probably be removed)
  getLobbys(): Observable<Lobby[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  //get lobby information by id
  getLobbyById(lobbyid: String): Observable<Lobby> {
    return this.http.get<any>(`${this.apiUrl}/${lobbyid}`).pipe(
      tap(response => console.log(response)),
      map(response => {
        const lobby = new Lobby(
          response._id,
          response.creator,
          response.users,
          response.team1champs,
          response.team2champs,
          response.createdAt,
          response.updatedAt,
          response.__v
        );
        return lobby;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  //create a new lobby(creator id needs to be given)
  addLobby(creatorid: String): Observable<Lobby> {
      const lobby = { creator: creatorid };
      return this.http.post<any>(`${this.apiUrl}`, lobby);
  }


  //remove a lobby by id
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
