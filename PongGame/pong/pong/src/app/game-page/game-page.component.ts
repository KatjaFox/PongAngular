import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit {

  ball : Ball;
  table: Table;
  racket : Racket;
  botRacket : Racket;
  racketMoveStep : number;
  gameCollisionObjects : IGameObject[] = [];
  roundsPlayed : number;
  roundsLeft : number;
  gameEnd : boolean;
  pause : boolean;
  speedInterval : number;
  points : number;
  level : number;
  racketSpeed : number;
  botRacketSpeed : number;
  comment : string;

  constructor(private scoreService : ScoreService) { 
    this.roundsPlayed = 0;
    this.gameEnd = false;
    this.pause = true;
  }

  restart()
  {
    window.location.reload();
  }

  convertPixelsToPercentage(value : number, parent : number) : number
  {
    let percentageValue : number;
    percentageValue = 100*value/parent;

    return percentageValue;
  }

  ngOnInit() {
    const table = document.getElementById("tableDiv"); 
    this.roundsPlayed = 0;
    this.roundsLeft = 3 - this.roundsPlayed;
    this.points = 0;
    this.level = 1;
    this.pause = true;
    this.gameEnd = false;
    
    const ball = document.createElement("div");
    ball.className = "ball";
    let image = document.createElement("p");
    image.id = "ballImg";
    ball.appendChild(image);

    const racket = document.createElement("div");
    racket.className = "racket";

    const botRacket = document.createElement("div");
    botRacket.className = "racket";

    this.ball = new Ball(ball);
    this.racket = new Racket(racket);

    this.botRacket = new Racket(botRacket);
    
    table.appendChild(ball);
    table.appendChild(racket);
    table.appendChild(botRacket);
    this.table = new Table(table);
    this.table.width = table.offsetWidth;
    this.table.height = table.offsetHeight;

    this.botRacket.left = this.table.width/2;
    this.botRacket.top = this.table.top + this.table.height/10;
    this.botRacket.width = this.table.width/10;  //35
    this.botRacket.height = this.botRacket.width/4; //15

    this.racket.left = this.table.width/2; 
    this.racket.top = this.table.height - this.table.height/10;
    this.racket.width = this.table.width/10; 
    this.racket.height =  this.botRacket.width/4;

    this.ball.left = this.table.width/2; 
    this.ball.top = this.racket.top - this.ball.ball.offsetHeight -  5;
    this.ball.width = this.botRacket.width/2 + 4; 
    this.ball.height = this.botRacket.width/2;
    

    this.ball.ball.style.left = 
    `${this.convertPixelsToPercentage(this.ball.left, table.offsetWidth)}%`;
    this.ball.ball.style.top = 
    `${this.convertPixelsToPercentage(this.ball.top, table.offsetHeight)}%`;
    this.ball.ball.style.backgroundPosition = `0% 0px`;

    this.racket.racket.style.width = 
    `${this.convertPixelsToPercentage(this.racket.width, table.offsetWidth)}%`;
    this.racket.racket.style.height = 
    `${this.convertPixelsToPercentage(this.racket.height, table.offsetHeight)}%`;

    this.botRacket.racket.style.width = 
    `${this.convertPixelsToPercentage(this.botRacket.width, table.offsetWidth)}%`;
    this.botRacket.racket.style.height = 
    `${this.convertPixelsToPercentage(this.botRacket.height, table.offsetHeight)}%`;


     this.ball.ball.style.width = 
    `${this.convertPixelsToPercentage(this.ball.width, table.offsetWidth)}%`;
    this.ball.ball.style.height = 
    `${this.convertPixelsToPercentage(this.ball.height, table.offsetHeight)}%`;

    this.racket.racket.style.left = 
    `${this.convertPixelsToPercentage(this.racket.left, table.offsetWidth)}%`;
    this.racket.racket.style.top = 
    `${this.convertPixelsToPercentage(this.racket.top, table.offsetHeight)}%`;
    this.racket.racket.style.width = 
    `${this.convertPixelsToPercentage(this.racket.width, table.offsetWidth)}%`;
    this.racket.racket.style.height = 
    `${this.convertPixelsToPercentage(this.racket.height, table.offsetHeight)}%`;

    this.botRacket.racket.style.left = 
    `${this.convertPixelsToPercentage(this.botRacket.left, table.offsetWidth)}%`;
    this.botRacket.racket.style.top = 
    `${this.convertPixelsToPercentage(this.botRacket.top, table.offsetHeight)}%`;
    this.botRacket.racket.style.width = 
    `${this.convertPixelsToPercentage(this.botRacket.width, table.offsetWidth)}%`;
    this.botRacket.racket.style.height = 
    `${this.convertPixelsToPercentage(this.botRacket.height, table.offsetHeight)}%`;

    this.gameCollisionObjects.push(this.racket);
    this.gameCollisionObjects.push(this.botRacket);

    document.addEventListener("keydown", (e) => 
    {
      if(e.which == 39) // arrow right
      {
        this.moveRacketRight();
      }});

    document.addEventListener("keydown", (e) => 
    {
      if(e.which == 37) // arrow left
      {
        this.moveRacketLeft();
      }});

    document.addEventListener("keydown", (e) => 
    {
      if(e.which == 32) // spacebar
      {
         if(this.pause && !this.gameEnd)
         {
            var checker = setInterval(() =>
            {
              if(this.gameEnd)
              {
                clearInterval(checker);
              }

              // if(this.checkForTableSizeChange())
              // {
              //   this.pause = true;

              //   console.log("table changed");

              //   this.table.width = this.table.table.offsetWidth;
              //   this.table.height = this.table.table.offsetHeight;

              //   this.racketMoveStep = 
              //   this.convertPixelsToPercentage(this.table.width, table.offsetWidth);
              //   this.racketSpeed = 
              //   this.convertPixelsToPercentage(this.table.width*0.1, table.offsetWidth);
              //   this.botRacketSpeed = this.convertPixelsToPercentage(25, table.offsetWidth);
              //   this.speedInterval = this.convertPixelsToPercentage(40, table.offsetWidth);

              //   this.game(checker);
              //   this.pause = false;
              // }
            });

            this.game(checker);
        
           this.pause = false;   
        }
      }
    });

      this.racketMoveStep = 
      this.convertPixelsToPercentage(this.table.width, table.offsetWidth);
      this.racketSpeed = 
      this.convertPixelsToPercentage(this.table.width*0.1, table.offsetWidth);
      this.botRacketSpeed = this.convertPixelsToPercentage(20, table.offsetWidth);
      this.speedInterval = this.convertPixelsToPercentage(30, table.offsetWidth);
  }

  animateBall() 
  {
    console.log(this.ball.ball.style.backgroundPosition);

    if(this.ball.ball.style.backgroundPosition == `0% 0px`)
    {
      console.log("changing");
      console.log(this.ball.ball.style.backgroundPosition);
      this.ball.ball.style.backgroundPosition = 
      `100% 0px`;
    }
    else if(this.ball.ball.style.backgroundPosition == `100% 0px`)
    {
      console.log("changing");
      console.log(this.ball.ball.style.backgroundPosition);
      this.ball.ball.style.backgroundPosition = 
      `0% 0px`;
    }
  }

  checkForTableSizeChange() : boolean
  {
    if(this.table.width != this.table.table.offsetWidth ||
      this.table.height != this.table.table.offsetHeight )
      {
        return true;
      }

    return false;
  }

  game(checker)
  {
    if(this.pause)
    {
      clearInterval(checker);
    }

    this.continueGame();
    this.createNewObstacle();

    var pointsM = setInterval(() => 
    {
      this.points++;

      if(this.pause)
      {
        clearInterval(pointsM);
      }
    }, 1);

    var timeMethod = setInterval(() => 
    {
      this.changeLevel();

      if(this.pause)
      {
        clearInterval(timeMethod);
      }
    }, 10000);
  }

  continueGame()
  {
    this.moveBallInField();
    this.moveBotRacketInField();   
  }
  

  overlaping(ball : Ball, element : IGameObject) : boolean
  {
    let ballTop = ball.top;
    let ballLeft = ball.left;
    let ballRight = ball.left + ball.ball.offsetWidth;
    let ballDown = ball.top + ball.ball.offsetHeight;

    if(ball.ballDirection == BallDirection.topLeft)
    {
      ballTop = ballTop + this.racketMoveStep;
      ballLeft = ballLeft + this.racketMoveStep;
    }
    else if(ball.ballDirection == BallDirection.topRight)
    {
      ballTop = ballTop + this.racketMoveStep;
      ballRight = ballRight + this.racketMoveStep; 
    }
    else if(ball.ballDirection == BallDirection.downRight)
    {
      ballDown = ballDown + this.racketMoveStep;
      ballRight = ballRight + this.racketMoveStep; 
    }
    else if(ball.ballDirection == BallDirection.downLeft)
    {
      ballDown = ballDown + this.racketMoveStep;
      ballLeft = ballLeft + this.racketMoveStep;
    }

    let elementTop = element.element.offsetTop;
    let elementLeft = element.element.offsetLeft
    ;
    let elementRight = elementLeft + element.element.offsetWidth*1.5; 
    let elementDown = elementTop + element.element.offsetHeight*1.5;

    if(ballTop >= elementTop && ballTop <= elementDown && 
      (ballRight >= elementLeft && ballRight <= elementRight ||
        ballRight >= elementLeft&& ballRight <= elementRight) ||
       ballDown >= elementTop && ballDown <= elementDown && 
       (ballRight >= elementLeft && ballRight <= elementRight ||
        ballRight >= elementLeft && ballRight <= elementRight)
      )
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  checkForCollision(ball : Ball, table : Table, gameCollisionObjects : IGameObject[])
  {
    if(ball.down + ball.height/3 > table.down)
    {
      console.log("round ended");
      this.endRound();
      return;
    }

    for(let i = 0; i < gameCollisionObjects.length; i++)
    {
      let element = gameCollisionObjects[i];

      if(ball.collisionObjList.includes(element))
      {
        if(!this.overlaping(ball, element))
        {
          this.ball.collisionObjList.splice(ball.collisionObjList.indexOf(element));
        }
      }
      else
      {
        if(this.overlaping(ball, element))
        {
          if(element instanceof Obstacle)
          {
            this.changeBallDirection(ball, element, this.racketMoveStep); 
            this.gameCollisionObjects.splice(ball.collisionObjList.indexOf(element));
            this.table.table.removeChild(element.element);
          }
          else
          {
            ball.collisionObjList.push(element);
            this.changeBallDirection(ball, element, this.racketMoveStep);            
          }
        }
      }
    }
  }

  endRound()
  {      
    if(!this.gameEnd)
    {
      this.pause = true;

      if(this.roundsPlayed < 2)
      {
        this.roundsPlayed ++;

        alert('round ended, press spacebar to continue');

        this.ball.left = this.racket.left + this.racket.width/2; 
        this.ball.top = this.racket.top - this.ball.ball.offsetHeight -  5;
        this.ball.ball.style.left = `${this.convertPixelsToPercentage(
          this.ball.left, this.table.table.offsetWidth)}%`;

        this.ball.ball.style.top = `${this.convertPixelsToPercentage(
          this.ball.top, this.table.table.offsetHeight)}%`;
      }
      else
      {
        this.roundsPlayed ++;
        this.gameEnd = true;
        alert('game end');
        this.comment = prompt("Please enter your comment");
        this.saveScore(this.points, this.comment);
        this.restart();
      }
    }
  }

  saveScore(points : number, comment: string) {
    this.scoreService.addScore(points, comment).subscribe(
      data => { }
    );
  }

  changeBallDirectionInTable(ball: Ball, table: Table, racketMoveStep : number) 
  {
    let tableRight = table.table.offsetWidth;
    let tableDown = table.table.offsetHeight;
    let tableLeft = table.table.clientLeft;
    let tableTop = table.table.clientTop;

    
    let ballTop = ball.top;
    let ballLeft = ball.left;
    let ballRight = ball.left + ball.ball.offsetWidth;
    let ballDown = ball.top + ball.ball.offsetHeight;

    switch(ball.ballDirection)
    {
      case BallDirection.topRight:
          if(ballTop <= tableTop && 
            ballRight + racketMoveStep + ball.width/2 < tableRight) 
          {
            ball.ballDirection = BallDirection.downRight;
          }
          else if(ballTop <= tableTop) 
          {
            ball.ballDirection = BallDirection.downLeft;
          }
          else if(ballRight + racketMoveStep + ball.width/2 >= tableRight)
          {
            ball.ballDirection = BallDirection.topLeft;
          }
          else
          {
            ball.ballDirection = Math.floor(Math.random() * 3);
          }
        break;
      case BallDirection.downRight:
      ball.ballDirection = BallDirection.downLeft;    

        break;
      case BallDirection.downLeft:
          if(ballDown + racketMoveStep + ball.height/2 >= tableDown && 
            ballLeft <= tableLeft)
          {
            ball.ballDirection = BallDirection.topRight;
          }
          else if(ballDown + racketMoveStep + ball.height/2 >= tableDown)
          {
            ball.ballDirection = BallDirection.topLeft;
          }
          else if(ballLeft <= tableLeft)
          {
            ball.ballDirection = BallDirection.downRight;
          }
          else
          {
            ball.ballDirection = Math.floor(Math.random() * 3);
          }
        break;
      case BallDirection.topLeft:
          if(ballLeft <= tableLeft)
          {
            ball.ballDirection = BallDirection.topRight;
          }
          else if(ballTop <= tableTop)
          {
            ball.ballDirection = BallDirection.downLeft;
          }
          else
          {
            ball.ballDirection = BallDirection.downRight;
          }
        break;
      default :
        ball.ballDirection = Math.floor(Math.random() * 3);
        break 
    }
  }

  changeBallDirection(ball: Ball, element: IGameObject, racketMoveStep : number) 
  {
    let tableRight = element.element.offsetWidth;
    let tableDown = element.element.offsetHeight;
    let tableLeft = element.element.clientLeft;
    let tableTop = element.element.clientTop;

    
    let ballTop = ball.top;
    let ballLeft = ball.left;
    let ballRight = ball.left + ball.ball.offsetWidth;
    let ballDown = ball.top + ball.ball.offsetHeight;

    switch(ball.ballDirection)
    {
      case BallDirection.topRight:
          if(ballTop <= tableTop && 
            ballRight + racketMoveStep + ball.width/2 < tableRight) 
          {
            ball.ballDirection = BallDirection.downRight;
          }
          else 
          {
            ball.ballDirection = BallDirection.downLeft;
          }

        break;
      case BallDirection.downRight:  
      if(ballTop < tableTop && 
            ballRight + racketMoveStep + ball.width/2 < tableRight) // top
          {
            ball.ballDirection = BallDirection.topRight;
          }

          else
          {
            ball.ballDirection = BallDirection.topRight;
          }
        break;
      case BallDirection.downLeft:
          if(ballDown + racketMoveStep + ball.height/2 >= tableDown && 
            ballLeft <= tableLeft)
          {
            ball.ballDirection = BallDirection.topRight;
          }
          else 
          {
            ball.ballDirection = BallDirection.topLeft;
          }
        break;
      case BallDirection.topLeft:

          if(ballTop <= tableTop)
          {
            ball.ballDirection = BallDirection.downLeft;
          }
          else
          {
            ball.ballDirection = BallDirection.downRight;
          }
        break;
    }
  }

  changeBallDirectionToOpposite(ball: Ball, table: Table, racketMoveStep : number) 
  {
    let tableRight = table.table.offsetWidth;
    let tableDown = table.table.offsetHeight;
    let tableLeft = table.table.clientLeft;
    let tableTop = table.table.clientTop;

    
    let ballTop = ball.top;
    let ballLeft = ball.left;
    let ballRight = ball.left + ball.ball.offsetWidth;
    let ballDown = ball.top + ball.ball.offsetHeight;

    switch(ball.ballDirection)
    {
      case BallDirection.topRight:
            ball.ballDirection = BallDirection.downLeft;
        break;
      case BallDirection.downRight:
          ball.ballDirection = BallDirection.topLeft;
        break;
      case BallDirection.downLeft:
            ball.ballDirection = BallDirection.topRight;
        break;
      case BallDirection.topLeft:
            ball.ballDirection = BallDirection.downRight;
        break;
    }
  }

  changeLevel()
  {
    this.level++;
    this.createNewObstacle();
    if(this.speedInterval > 10)
    { 
      this.speedInterval -= 
      this.convertPixelsToPercentage(5, this.table.table.offsetWidth);
      this.racketMoveStep += 
      this.convertPixelsToPercentage(5, this.table.table.offsetWidth);
    }

    if(this.racket.racket.offsetWidth > 10)
    {
      this.racket.width = this.racket.racket.offsetWidth;
      this.racket.width -= 2; // max -> 10   
      this.racket.racket.style.width = `${this.convertPixelsToPercentage(
        this.racket.width, this.table.table.offsetWidth)}%`;
    }
    this.animateBall();
  }

  getRandomColor() : string {
    let letters : string = '0123456789ABCDEF';
    let color : string = '#';

    for (var i = 0; i < 6; i++) 
    {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createNewObstacle() 
  {
    const obstacle = document.createElement("div");
    obstacle.className = "obstacle";

    this.table.table.appendChild(obstacle);
    let obstcl = new Obstacle(obstacle);
    obstcl.width = obstacle.offsetWidth/2;
    obstcl.height = obstacle.offsetHeight/2;
    obstcl.top = obstacle.offsetTop;
    obstcl.left = obstacle.offsetLeft;
    obstcl.down = obstacle.offsetTop + obstcl.height;
    obstcl.right = obstacle.offsetLeft + obstcl.width; 

    obstcl.left = Math.floor(
      Math.random() * (this.table.width - obstcl.width)) + this.table.left;
    obstcl.top = Math.floor(
      Math.random() * (this.table.height/2 - obstcl.height)) + this.table.top;

    obstcl.obstacle.style.left = `${this.convertPixelsToPercentage(
      obstcl.left, this.table.table.offsetWidth)}%`;
    obstcl.obstacle.style.top = `${this.convertPixelsToPercentage(
      obstcl.top, this.table.table.offsetHeight)}%`;

      obstcl.obstacle.style.width = `${this.convertPixelsToPercentage(
        obstcl.width, this.table.table.offsetWidth)}%`;
      obstcl.obstacle.style.height = `${this.convertPixelsToPercentage(
        obstcl.height, this.table.table.offsetHeight)}%`;

    this.gameCollisionObjects.push(obstcl);
  }

  moveBallInField() 
  {
    clearInterval(processor);

    this.ball.ballDirection = BallDirection.topRight;

    var processor = setInterval(() => 
    {
      if(this.pause || this.gameEnd)
      {
        clearInterval(processor);
      }

      if(this.checkForTableSizeChange())
      {
        console.log("table changed");
      }

      this.table.width = this.table.table.offsetWidth;
      this.table.height = this.table.table.offsetHeight;

      this.racketSpeed = 
      this.convertPixelsToPercentage(this.table.width*0.1, this.table.table.offsetWidth);
      this.botRacketSpeed = this.convertPixelsToPercentage(25, this.table.table.offsetWidth);
      this.speedInterval = this.convertPixelsToPercentage(40, this.table.table.offsetWidth);
    
      this.ball.ball.style.left = 
      `${this.convertPixelsToPercentage(this.ball.left, this.table.table.offsetWidth)}%`;
      this.ball.ball.style.top = 
      `${this.convertPixelsToPercentage(this.ball.top, this.table.table.offsetHeight)}%`;


      this.racket.racket.style.left = 
      `${this.convertPixelsToPercentage(this.racket.left, this.table.table.offsetWidth)}%`;

      this.racketMoveStep = 
      this.convertPixelsToPercentage(this.table.width, this.table.table.offsetWidth)*0.01 + this.level*0.2;

      let tableRight = this.table.table.offsetWidth; 
      let tableDown = this.table.table.offsetHeight;
      let tableLeft = this.table.table.clientLeft;
      let tableTop = this.table.table.clientTop;
  
      
      let ballTop = this.ball.top;
      let ballLeft = this.ball.left;
      let ballRight = this.ball.left + this.ball.ball.offsetWidth;
      let ballDown = this.ball.top + this.ball.ball.offsetHeight;

      let ballwidth = this.ball.ball.offsetWidth;
      let ballHeight = this.ball.ball.offsetHeight;

      this.ball.right = ballRight;
      this.ball.down = ballDown;
      this.ball.width = ballwidth;
      this.ball.height = ballHeight;

      this.table.left = tableLeft;
      this.table.top = tableTop;
      this.table.right = tableRight;
      this.table.down = tableDown;

      switch(this.ball.ballDirection)
      {
        case BallDirection.topRight:
          if(ballTop > tableTop && 
            ballRight + this.racketMoveStep + ballwidth/2 < tableRight)
          {
            this.ball.left += this.racketMoveStep;
            this.ball.top -= this.racketMoveStep;
          }
          else
          {
            this.changeBallDirectionInTable(this.ball, this.table, this.racketMoveStep);
          }
          break;
        case BallDirection.downRight:
        if(ballDown + ballHeight/10 < tableDown && 
          ballRight + this.racketMoveStep + ballwidth/2 < tableRight) 
          {
            this.ball.left += this.racketMoveStep;
            this.ball.top += this.racketMoveStep;
          }
          else
          {
            this.changeBallDirectionInTable(this.ball, this.table, this.racketMoveStep);
          }
          break;
        case BallDirection.downLeft:
        if(ballDown < tableDown && 
          ballLeft > tableLeft)
          {
            this.ball.left -= this.racketMoveStep;
            this.ball.top += this.racketMoveStep;
          }
          else
          {
            this.changeBallDirectionInTable(this.ball, this.table, this.racketMoveStep);
          }
          break;
        case BallDirection.topLeft:
          if(ballTop > tableTop && 
            ballLeft > tableLeft)
          {
            this.ball.left -= this.racketMoveStep;
            this.ball.top -= this.racketMoveStep;
          }
          else
          {
            this.changeBallDirectionInTable(this.ball, this.table, this.racketMoveStep);
          }
          break;
      }

      this.ball.ball.style.left = `${this.convertPixelsToPercentage(
        this.ball.left, this.table.table.offsetWidth)}%`;
      this.ball.ball.style.top = `${this.convertPixelsToPercentage(
        this.ball.top, this.table.table.offsetHeight)}%`;

      this.checkForCollision(this.ball, this.table, this.gameCollisionObjects);

    }, this.speedInterval);  
  }

  moveBotRacketInField() 
  {
    clearInterval(processor);
    this.botRacketSpeed = 
      this.convertPixelsToPercentage(10, this.table.table.offsetWidth);

    var processor = setInterval(() => 
    {
      if(this.pause || this.gameEnd)
      {
        clearInterval(processor);
      }

      this.botRacket.racket.style.left = 
        `${this.convertPixelsToPercentage(this.botRacket.left, this.table.table.offsetWidth)}%`;

      this.botRacket.left = this.botRacket.racket.offsetLeft;

      if(this.botRacket.isMovingRight)
      {
        if(this.botRacket.racket.offsetLeft + this.botRacketSpeed + 
          this.botRacket.racket.offsetWidth < 
          this.table.table.offsetWidth)
        {
          this.botRacket.left += this.botRacketSpeed;
        }
        else
        {
          this.botRacket.isMovingRight = false;
        }
      }
      else
      {
        if(this.botRacket.racket.offsetLeft - this.botRacketSpeed > -2)
        {
          this.botRacket.left -= this.botRacketSpeed;
        }
        else
        {
          this.botRacket.isMovingRight = true;
        }
      }

      this.botRacket.racket.style.left = `${this.convertPixelsToPercentage(
        this.botRacket.left, this.table.table.offsetWidth)}%`;

    }, 70);

    var step = setInterval(() => 
    {
      this.botRacketSpeed = 
      this.convertPixelsToPercentage(Math.floor(Math.random() * 25) + 5, 
      this.table.table.offsetWidth);

      if(this.pause)
      {
        clearInterval(step);
      }
    }, 3000);

  }

  moveRacketRight()
  {
    if(this.racket.racket.offsetLeft + this.racketSpeed + 
      this.racket.racket.offsetWidth + 3 < 
      this.table.table.offsetWidth)
    {
      this.racket.left += this.racketSpeed;
      this.racket.top = this.racket.racket.offsetTop;
    }

    this.racket.racket.style.left = `${this.convertPixelsToPercentage(
      this.racket.left, this.table.table.offsetWidth)}%`;
  }

  moveRacketLeft()
  {
    if(this.racket.racket.offsetLeft - this.racketSpeed > -2)
    {
      this.racket.left -= this.racketSpeed;
      this.racket.top = this.racket.racket.offsetTop;
    }

    this.racket.racket.style.left = `${this.convertPixelsToPercentage(
      this.racket.left, this.table.table.offsetWidth)}%`;
  }
}

interface IGameObject
{
  left : number;
  top : number;
  right : number;
  down : number;

  element : HTMLDivElement;
}

class Racket implements IGameObject
{
  constructor(racket : HTMLDivElement) 
  {
      this.racket = racket;
      this.element = this.racket;
      this.left = this.racket.offsetLeft;
      this.top = this.racket.offsetTop;
      this.right = this.left + this.racket.offsetWidth;
      this.down = this.top + this.racket.offsetHeight;

      this.isMovingRight = true;
  }

  racket : HTMLDivElement;
  element : HTMLDivElement = this.racket;
  left : number;
  top : number;
  right : number;
  down : number;

  width : number;
  height: number;
  isMovingRight : boolean;
}

class Obstacle implements IGameObject
{
  constructor(obstacle : HTMLDivElement) 
  {
    this.obstacle = obstacle;
    this.element = this.obstacle;
    this.left = this.obstacle.offsetLeft;
    this.top = this.obstacle.offsetTop;
    this.right = this.left + this.obstacle.offsetWidth;
    this.down = this.top + this.obstacle.offsetHeight;
  }
  
  obstacle : HTMLDivElement;
  element : HTMLDivElement = this.obstacle;
  left : number;
  top : number;
  right : number;
  down : number;

  width : number;
  height: number;
}

enum BallDirection
{
  topRight,
  downRight,
  downLeft,
  topLeft
}
class Ball implements IGameObject
{
  constructor(ball : HTMLDivElement) 
  {
      this.ball = ball;
      this.element = this.ball;
      this.width = this.ball.offsetWidth;
      this.height = this.ball.offsetHeight;

      this.right = this.left + this.ball.offsetWidth;
      this.down = this.top + this.ball.offsetHeight;

      this.ballDirection = BallDirection.topRight;
      this.collisionObjList = [];
  }

  PrintBallDirection() : string
  {
    switch(this.ballDirection)
    {
      case BallDirection.topRight:
        return "topRight";
      case BallDirection.downRight:
      return "downRight";
      case BallDirection.downLeft:
      return "downLeft";
      case BallDirection.topLeft:
      return "topLeft";
    }
  }

  ballDirection: BallDirection;
  ball : HTMLDivElement;
  element : HTMLDivElement = this.ball;
  left : number;
  top : number;
  right : number;
  down : number;
  width : number;
  height : number;
  collisionObjList: IGameObject[];
}

class Table 
{
  constructor(table : HTMLElement) 
  {
      this.table = table;

      this.width =  this.table.clientWidth;
      this.height = this.table.clientHeight;

      this.left = this.table.clientLeft;
      this.top = this.table.clientTop;
      this.right = this.left + this.table.clientWidth;
      this.down = this.top + this.table.clientHeight;

  }

  table : HTMLElement;
  left : number;
  top : number;
  right : number;
  down : number;
  width : number;
  height : number;
}
