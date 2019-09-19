import * as express from "express";
import * as path from "path";

import { Game } from "./game";
import { User } from "./user";

const uuid = require("uuidv4");

let leaderboardScores: Array<{ username: string, score: number, comment: string }> = [];

const users: User[] = [];

export class Server {
    public app: express.Application;

    constructor() 
    {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "pong/dist/pong")));
        this.app.use(this.authentificate);
        this.app.get("/login/:user.:password", this.login);
        this.app.get("/register/:user.:password", this.register);
        this.app.get("/logout", this.logout);
        this.app.get("/addscore/:score.:comment", this.addNewScore);
        this.app.get("/personalscorehistory", this.getUserScoreHistory);
        this.app.get("/leaderboardscores", this.getLeaderboardScores);
        this.app.listen(3003); 
    }

    private getUserScoreHistory(req: express.Request, res: express.Response) 
    {
        const uuidValue: string = req.header("Authorization");

        for (let u of users) 
        {
            if (u.token === uuidValue) 
            {
                res.send(u.gamesPlayed);
                return;
            }
        }
    }

    private getLeaderboardScores(req: express.Request, res: express.Response) 
    {
        res.send(leaderboardScores);
    }

    private addNewScore(req: express.Request, res: express.Response) 
    {
        const score = req.params.score;
        const comment = req.params.comment;
        let userExists = false;

        const uuidValue: string = req.header("Authorization");

        for (let u of users) 
        {
            if (u.token === uuidValue) 
            {
                u.gamesPlayed.push(new Game(score, comment));
                userExists = true;
            }
        }

        for (let u of users) 
        {
            leaderboardScores.push({
                comment: u.gamesPlayed[0].comment, 
                username: u.username,
                score: u.gamesPlayed[0].score,
            });
        }

        leaderboardScores.sort((a, b) => b.score - a.score);

        if (userExists) 
        {
            res.send(200, "success");
        } else 
        {
            res.send(404, "No such user");
        }
    }

    private login(req: express.Request, res: express.Response) 
    {
        const username = req.params.user;
        const password = req.params.password;

        for (let i of users) 
        {
            if (i.username === username && i.password === password) 
            {
                i.token = uuid();
                res.send(i.token);
                return;
            }
        }
        res.send(404, "Can`t find user.");
    }

    private register(req: express.Request, res: express.Response) 
    {
        const username: string = req.params.user;
        const password: string = req.params.password;

        for (let u of users) 
        {
            if (u.username === username) 
            {
                res.send(409, "User already exists.");
                return;
            }
        }

        users.push(new User(username, password, uuid()));
        res.send();
    }

    private logout(req: express.Request, res: express.Response) 
    {
        const uuidValue: string = req.header("Authorization");

        for (const u of users) {
            if (u.token === uuidValue) {
                u.token = null;
            }
        }
        res.send();
    }

    private authentificate(req: express.Request, res: express.Response, next: express.NextFunction) 
    {
        if ((req.url.search("login") !== -1) || (req.url.search("register") !== -1) 
        || (req.url.search("") !== -1)) 
        {
            next();
        } 
        else 
        {
            if (req.header("Authorization") == null) 
            {
                res.status(401).send("Unauthorized. Log in the system");
                return;
            } 
            else 
            {
                next();
            }
        }
    }
}

new Server();