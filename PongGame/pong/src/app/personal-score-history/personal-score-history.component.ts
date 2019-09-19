import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-personal-score-history',
  templateUrl: './personal-score-history.component.html',
  styleUrls: ['./personal-score-history.component.scss']
})
export class PersonalScoreHistoryComponent implements OnInit 
{
  personalScores: string[];
  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.getPersonalScoreHistory();
  }

  getPersonalScoreHistory()
  {
    this.scoreService.getPersonalScoreHistory().subscribe(
      data => 
      {
        this.personalScores = JSON.parse(data.toString());
      });
  }
}