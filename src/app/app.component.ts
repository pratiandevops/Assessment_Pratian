import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './models/IUser';
import { AuthenticationService } from './shared-modules/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CodeAssessmet';
  user: IUser;
  flag:boolean=false;
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.authentication.currentUser.subscribe((data) => {
      this.user = data;
    });
  }
  logout() {
    this.authentication.logout();
    this.router.navigate(['/']);
  }
}
