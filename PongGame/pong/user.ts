import { Game } from "./game";

export class User {

    public username: string;
    public password: string;
    public token: string;
    public gamesPlayed: Game[] = [];

    constructor(name: string, password: string, token: string) {
        this.username = name;
        this.password = password;
        this.token = token;
    }
}
