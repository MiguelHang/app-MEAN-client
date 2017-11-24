import  { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { Song } from '../models/song';
import  { SongService } from '../services/song.services';



@Component({
  selector:'song',
  templateUrl:'../views/song.html',
  providers: [UserService, SongService]
})

export class SongComponent implements OnInit{
  @Input() song: Song;
  @Output() reloadParent = new EventEmitter();
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _songService: SongService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('song component cargado');
  }

}
