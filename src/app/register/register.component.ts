import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordEye: string = 'password';
  passwordEyeCheck: boolean = false;
  message: string = '';

  RegistrationForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{4,10}$/)]),
    last_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{4,10}$/)]),
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*)[a-zA-Z]{5,20}[0-9]{0,5}@[a-zA-Z]{4,8}\.[a-zA-Z]{2,5}$/)]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*[a-zA-Z]{5,8})([a-zA-Z0-9 !@#$%^&*]{8,15})$/)]),
    age: new FormControl(null,
      [Validators.required, Validators.min(20), Validators.max(80)])

  });
  constructor(private Auth: AuthService, private rout: Router) { }
  applyRegister(form: object): void {
    this.Auth.register(form).subscribe((res) => {
      console.log(res);
      
      if (res.errors) {
        this.message = res.message;
      
      }
      else {
        this.message = res.message;
        this.RegistrationForm.reset();
        console.log(this.RegistrationForm.value);
        setTimeout(() => {
          this.rout.navigate(['/login']);
        }, 3000);
        // this.rout.navigate(['/login']);

      }

    });

  }


  ngOnInit(): void {

  }

}
