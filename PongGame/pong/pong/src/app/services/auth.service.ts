import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../../../user';

@Injectable({ providedIn: 'root' })

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private apiUrl = 'http://localhost:3003';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User 
    {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) 
    {
        return this.http.get(`${this.apiUrl}/login/` + 
        username + '.' + password, 
        { 
          responseType: 'text' 
        });
    }

    logout() 
    {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null)

        return this.http.get(`${this.apiUrl}/logout/`, 
        { 
          responseType: 'text' 
        });
    }

    register(username: string, password: string) 
    {
        return this.http.get(`${this.apiUrl}/register/` + 
          username + '.' + password, 
          { 
            responseType: 'text' 
          });
        }
}