import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  
  passwordEye:string='password';

  message:string='';
  LoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*)[a-zA-Z]{5,20}[0-9]{0,5}@[a-zA-Z]{4,8}\.[a-zA-Z]{2,5}$/)]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*[a-zA-Z]{5,8})([a-zA-Z0-9 !@#$%^&*]{8,15})$/)])

  });
  constructor(private auth:AuthService,private router:Router) { 
   
  }
applyLogin(form:object):void{
   this.auth.login(form).subscribe((res)=>{
    if (res.errors) {
      this.message = res.message;
    }
    else {
      this.router.navigate(['/home']);
      localStorage.setItem("userToken",res.token);
      this.auth.tokenTransaction();
      this.LoginForm.reset();
      console.log(res);

    }

  })
}
  ngOnInit(): void {
  }

}
