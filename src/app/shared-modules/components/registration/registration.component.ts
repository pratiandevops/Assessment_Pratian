import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get f() { return this.signupForm.controls; }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    let data = {
      UserName: this.f.name.value,
      Password: this.f.password.value,
      PhoneNumber: this.f.phone.value,
      Email: this.f.email.value
    }
    this.authenticationService.signup(data)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/assessment']);
      },
      error => {
        console.log(error);
      });
  }
}
