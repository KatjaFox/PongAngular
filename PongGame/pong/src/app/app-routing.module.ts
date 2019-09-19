import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LeaderBoardPageComponent } from './leader-board-page/leader-board-page.component';
import { UserManualPageComponent } from './user-manual-page/user-manual-page.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonalScoreHistoryComponent } from './personal-score-history/personal-score-history.component';


const routes: Routes = [
{
    path: "register",
    component: RegisterComponent
},
{
    path: "home",
    component: AppComponent
},
{
    path: '', 
    component: LoginComponent
},
{
    path: "game",
    component: GamePageComponent
},
{
    path: "leaderboard",
    component: LeaderBoardPageComponent
},
{
    path: "about",
    component: UserManualPageComponent
},
{
    path: "personalhistory",
    component: PersonalScoreHistoryComponent
},
{
     path: '**', 
     redirectTo: '' 
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }),
        ReactiveFormsModule],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
