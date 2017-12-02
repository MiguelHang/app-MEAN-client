import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { UserService } from '../services/user.services';
import  { PlaylistService } from '../services/playlist.services';
import  { User } from '../models/user';
import  { GLOBAL } from '../services/global';
import { Playlist } from '../models/playlist';
import { SongService } from '../services/song.services';
import { Song } from '../models/song';



@Component({
  selector: 'user',
  templateUrl: '../views/user.html',
  providers: [UserService, PlaylistService, SongService]
})

export class UserComponent implements OnInit{
  public title: string;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public url: string;
  public playlist: Playlist;
  public songs: Song[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _playlistService: PlaylistService,
    private _songService: SongService
  ){
    this.title = 'Mi perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
    this.playlist = new Playlist('', '', '', '');
  }

  ngOnInit(){
    console.log('User.component.ts. cargado')
    this.playlist.user = this.user._id
    this.getPlaylist(this.playlist.user)
  }

  onSubmit(){
    console.log(this.playlist)
    this._playlistService.addPlaylist(this.token, this.playlist).subscribe(
      response => {
        this.playlist = response.playlist;

        if(!response.playlist){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'El playlist se ha creado';

          this.playlist = response.playlist
          // this._router.navigate(['/playlist-edit', response.playlist._id]);
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          // let body = JSON.parse(error._body)
          this.alertMessage = error._body.message;

          console.log(error);
        }
      }
    );
  }

  getPlaylist(id: string){
    this._playlistService.getPlaylist(this.token, id).subscribe(
      response => {
        this.playlist = response.playlist;

        if(!response.playlist){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'El playlist se ha encontrado';

          this.playlist = response.playlist
          // this._router.navigate(['/playlist-edit', response.playlist._id]);
          this._songService.getPlaylistSong(this.token, this.playlist._id).subscribe(
            response => {
              if(!response.songs){
                this.alertMessage = 'Error en el servidor';
              }else{
                this.alertMessage = 'Canciones encontradas';

                this.songs = response.songs
                // this._router.navigate(['/playlist-edit', response.playlist._id]);
              }
            },
            error => {
              let errorMessage = <any>error;

              if(errorMessage != null){
                // let body = JSON.parse(error._body)
                this.alertMessage = error._body.message;

                console.log(error);
              }
            }
          )
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          // let body = JSON.parse(error._body)
          this.alertMessage = error._body.message;

          console.log(error);
        }
      }
    );
  }

}
