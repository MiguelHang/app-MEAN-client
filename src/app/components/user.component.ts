import  { Component, OnInit } from '@angular/core';
import  { UserService } from '../services/user.services';
import  { User } from '../models/user';
import  { GLOBAL } from '../services/global';

@Component({
  selector: 'user',
  templateUrl: '../views/user.html',
  providers: [UserService]
})

export class UserComponent implements OnInit{
  public title: string;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public url: string;


  constructor(
    private _userService: UserService
  ){
    this.title = 'Mi perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;

  }

  ngOnInit(){
    console.log('User.component.ts. cargado')
  }
}
