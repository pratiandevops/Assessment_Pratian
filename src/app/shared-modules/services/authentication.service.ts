import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<IUser>;
    public currentUser: Observable<IUser>;

    constructor(private http: HttpClient,private toastr: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser {
        return this.currentUserSubject.value;
    }
    AuthenticationService
    login(username: string, password: string) {
        let qParams = new HttpParams();
        qParams.append("Email", username);
        qParams.append("Password", password);
        return this.http.get<any>('http://172.30.11.7:8099/api/User?Email=' + username + '&Password=' + password)
            .pipe(map(user => {
                // user = { "Username" : "Santosh", "EmailID" : "s.k.senapati1993@gmail.com"} 
                if (user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.toastr.success('Welcome Back !!', user.UserName);
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
        this.currentUserSubject.next(null);
        this.toastr.warning('logged out successfull');
    }
}