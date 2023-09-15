import { isThisTypeNode } from 'typescript';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = {};
  isLogin:boolean=false;
  constructor(private auth: AuthService) { }
  applyLogout() {
    this.auth.logout();
  }
  ngOnInit(): void {
    this.auth.userData.subscribe(() => {
      this.user = this.auth.userData.getValue();
      if(this.auth.userData.getValue()){
        this.isLogin = true; 
      }
      else{
        this.isLogin = false;
      }
    });
  }

}
