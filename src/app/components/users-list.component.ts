import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { User } from '../models/user';

@Component({
  selector:'users-list',
  templateUrl:'../views/user-list.html',
  providers: [UserService]
})

export class UsersListComponent implements OnInit{
  public title: string;
  public user: User;
  public users : User[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  public editorMode = false;
  public searchText: string;
  public alertMessage: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Usuarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.searchText = '';

  }

  ngOnInit(){
    console.log('user-list component cargado');
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers(this.token, this.searchText).subscribe(
      (response) => {
        this.users= response.users
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit(user){
    // console.log(this.user)
    this._userService.updateUser(user).subscribe(
      response =>{
        // this.user = response.user;

        if(!response.user){
          this.alertMessage = 'El usuario no se ha actualizado';
        }else{
          // this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          // document.getElementById('identity_name').innerHTML = this.user.name

          this.alertMessage = "Usuario actualizado";
        }
      },
      error =>{
        let errorMessage = <any>error;

        if(errorMessage != null){
          let body = JSON.parse(error._body)
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
  }
}
