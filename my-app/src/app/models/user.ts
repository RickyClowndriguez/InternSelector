
export class User {
  id: String;
  name: String;
  lobbyid: String;
  champion: String;

  constructor(id: String, name: String, lobbyid: String, champion: String) {
    this.id = id;
    this.name = name;
    this.lobbyid = lobbyid;
    this.champion= champion;
  }
}