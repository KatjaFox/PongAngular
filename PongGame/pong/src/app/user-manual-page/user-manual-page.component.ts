import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-manual-page',
  templateUrl: './user-manual-page.component.html',
  styleUrls: ['./user-manual-page.component.scss']
})
export class UserManualPageComponent implements OnInit {

  text : string;
  constructor() { }

  ngOnInit() 
  {
    this.text = "To play ufo-pong press spacebar and use arrow keys to control the bottom spaceship." +
    " If the ufo touches the bottom part of the field you failed to protect your territory and" +
    " the round is over. Press spacebar to play the next round." +
    " You have 3 rounds in total, then the game ends.";
  }

}
