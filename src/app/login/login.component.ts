import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
//@Models
import { UserData } from '../models/userData';
//@Services
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;
  errMsg: string;
  public token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public userData: UserData
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.errMsg = "";
    this.userData.setCredentials(this.form.value);
    let credentials = this.userData.getCredentials();
    this.authService.login(credentials)
      .subscribe(res => {
        let token = res.auth_token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser',
            JSON.stringify({ email: this.userData.getEmail(), token: this.token }));
          this.router.navigate(['/dashboard/home']);
        }
      }, error => {
        return this.handleError(error);
      })
  }

  private handleError (e: any) {
    let error = e.error;
    var firstKey = Object.keys(error)[0];
    this.errMsg = error[firstKey];
    return Observable.throw(this.errMsg);
  }

}
