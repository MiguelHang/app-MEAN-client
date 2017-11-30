import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { SongService } from '../services/song.services';
import { Song } from '../models/song';

@Component({
  selector:'song-add',
  templateUrl:'../views/song-add.html',
  providers: [UserService, SongService]
})

export class SongAddComponent implements OnInit{
  public title: string;
  public song: Song;
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
    this.title = 'Crear canción';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.song = new Song(1, '', '', '', '', []);
  }

  ngOnInit(){

    console.log('Song-add component cargado');

  }

  onSubmit(){

    this._route.params.forEach((params: Params) => {
      let album_id = params['album'];
      this.song.album = album_id;
    })
    console.log(this.song)
    this._songService.addSong(this.token, this.song).subscribe(
      response => {
        this.song = response.song;

        if(!response.song){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'La canción se ha creado!';

          this.song = response.song
          this._router.navigate(['/song-edit', response.song._id]);
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
