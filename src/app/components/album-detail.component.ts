import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { AlbumService } from '../services/album.services';
import  { SongService } from '../services/song.services';
import { Album } from '../models/album';
import { Song } from '../models/song';


@Component({
  selector:'album-detail',
  templateUrl:'../views/album-detail.html',
  providers: [UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit{
  public album : Album;
  public songs: Song[];
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('album-detail component cargado');
    this.getAlbum();
  }

  getAlbum(){
    this._route.params.forEach( (params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        response => {
          if(!response.album){
            this._router.navigate(['/']);
          }else{
            this.album = response.album;

            this._songService.getSongs(this.token, id).subscribe(
              response => {
                if(!response.songs){
                  this.alertMessage = 'Este album no tiene canciones';
                }else{
                  this.songs= response.songs;
                }
              }
              ,error => {
                let errorMessage = <any>error;

                if(errorMessage != null){
                  let body = JSON.parse(error._body)
                  // this.alertMessage = error._body.message;

                  console.log(error);
                }
              });
          }
        },
        error => {
          let errorMessage = <any>error;

          if(errorMessage != null){
            let body = JSON.parse(error._body)
            // this.alertMessage = error._body.message;

            console.log(error);
          }
        }
      )
    })
  }

  public confirmado;
  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelSong(){
    this.confirmado = null;
  }

  onDeleteSong(id){
    this._songService.deleteSong(this.token, id).subscribe(
      response => {
        if(!response.song){
            alert('Error en el servidor');
        }

        this.getAlbum();
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          let body = JSON.parse(error._body)
          // this.alertMessage = error._body.message;

          console.log(error);
        }
      }
    )
  }

}
