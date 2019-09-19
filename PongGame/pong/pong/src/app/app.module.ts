import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { UserManualPageComponent } from './user-manual-page/user-manual-page.component';
import { LeaderBoardPageComponent } from './leader-board-page/leader-board-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PersonalScoreHistoryComponent } from './personal-score-history/personal-score-history.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    UserManualPageComponent,
    LeaderBoardPageComponent,
    NavBarComponent,
    PersonalScoreHistoryComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [    
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
