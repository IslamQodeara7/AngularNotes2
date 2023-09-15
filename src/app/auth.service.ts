import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = ``;
  userData = new BehaviorSubject(null);
  constructor(private http: HttpClient,private router:Router) {

    if(localStorage.getItem('userToken')!=null){
      this.tokenTransaction();
      this.router.navigate(['/home']);
      
     } 
   }

  register(form: object): Observable<any> {
    return this.http.post("https://movies-api.routemisr.com/signup", form);
  }

  login(form: object): Observable<any> {
    return this.http.post("https://movies-api.routemisr.com/signin", form);
  }
  tokenTransaction(): void {
    this.token = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(this.token));
  }
  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
