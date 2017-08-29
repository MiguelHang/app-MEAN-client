import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { Artist } from '../models/artist';

@Component({
  selector:'artist-list',
  templateUrl:'../views/artists-list.html',
  providers: [UserService]
})

export class ArtistListComponent implements OnInit{
  public title: string;
  public artists : Artist[];
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('Artist component cargado');
  }
}
