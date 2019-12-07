import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<IUser>;
    public currentUser: Observable<IUser>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let data = {
            Email: username,
            Password: password
        }
        return this.http.post<any>(`http://172.30.11.7:8099/api/User`, data)
            .pipe(map(user => {
                user = { "Username" : "Santosh", "EmailID" : "s.k.senapati1993@gmail.com"} 
                if (user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    signup(data) {
        return this.http.post<any>(`http://172.30.11.7:8099/api/User`, data)
            .pipe(map(user => {
                if (user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}