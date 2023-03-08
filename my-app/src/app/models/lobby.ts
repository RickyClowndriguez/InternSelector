import { User } from './user';

export class Lobby {
  id: string;
  creatorid: string;
  users: String[];
  team1champs: String[];
  team2champs: String[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(id: string, creatorid: string, users: String[] , team1champs: String[], team2champs: String[], creation: string, update: string, __v: number) {
    this.id = id;
    this.creatorid = creatorid;
    this.users = users;
    this.team1champs= team1champs;
    this.team2champs= team2champs;
    this.createdAt = creation;
    this.updatedAt = update;
    this.__v = __v;
  }
}