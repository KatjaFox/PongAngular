import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'; // ??

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  constructor(private authService : AuthService, private router :Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    
    this.router.navigate(['']);
  }
}
