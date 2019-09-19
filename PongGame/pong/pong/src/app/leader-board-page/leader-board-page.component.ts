import { Component, OnInit } from '@angular/core';
import {User } from '../../../../user';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {
  allScores: string[];
  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.getAllScores();
  }

  getAllScores()
  {
    this.scoreService.getLeaderboardScores().subscribe(
      data => 
      {
        this.allScores = JSON.parse(data.toString());
      });
  }
}
