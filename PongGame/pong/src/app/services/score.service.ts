import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  addScore(newScore: number, comment: string) {
    return this.http.get('http://localhost:3003/addscore/' + newScore + '.' + comment, { responseType: 'text' });
  }

  getPersonalScoreHistory() {
    return this.http.get('http://localhost:3003/personalscorehistory', { responseType: 'text' });
  }

  getLeaderboardScores() {
    return this.http.get('http://localhost:3003/leaderboardscores', { responseType: 'text' });
  }
}
