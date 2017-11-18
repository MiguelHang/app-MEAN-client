import  { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { Album } from '../models/album';
import  { AlbumService } from '../services/album.services';



@Component({
  selector:'album',
  templateUrl:'../views/album.html',
  providers: [UserService, AlbumService]
})

export class AlbumComponent implements OnInit{
  @Input() album: Album;
  @Output() reloadParent = new EventEmitter();
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('album component cargado');
  }

  public confirmado;
  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelAlbum(){
    this.confirmado = null
  }

  onDeleteAlbum(id){
    this._albumService.deleteAlbum(this.token, id).subscribe(
      (response) =>{
        if(!response.album){
          alert('Error en el servidor');
        }
        this.reloadParent.emit({artist: response.album.artist});
      },
      (error) =>{
        console.log(error)
      }
    );
  }
}
