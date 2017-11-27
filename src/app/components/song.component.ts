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
  @Input() editorMode: boolean;
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

        // this.getAlbum();
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

  startPlayer(song){
    console.log(song)
    let songPlayer = JSON.stringify(song);
    let filePath = this.url + 'get-song-file/' + song.file;
    let imagePath = this.url + 'get-image-album/' + song.album.image;

    localStorage.setItem('soundSong', songPlayer);
    document.getElementById("mp3-source").setAttribute("src", filePath);
    (document.getElementById("player") as any).load();
    (document.getElementById("player") as any).play();

    document.getElementById('play-song-title').innerHTML = song.name;
    document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
    document.getElementById('play-image-album').setAttribute('src', imagePath);
  }

}
