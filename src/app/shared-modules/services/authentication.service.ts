import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
        
        return this.http.get<any>(`${environment.assessmentURL}/api/User?Email=${username}&Password=${password}`)
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.toastr.success('Welcome Back !!', user.UserName);
                }
                else {
                    this.toastr.error('Wrong Credentials', 'Error');
                }
                
                return user;
            }));
    }

    signup(data) {
        return this.http.post<any>(`${environment.assessmentURL}/api/User`, data)
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.toastr.success('Welcome !!', user.UserName);
                }
                else {
                    this.toastr.error('User already exist', 'Error');
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.toastr.warning('logged out successfull');
    }
}