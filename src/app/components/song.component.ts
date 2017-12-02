import  { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { Song } from '../models/song';
import  { SongService } from '../services/song.services';
import  { PlaylistService } from '../services/playlist.services';



@Component({
  selector:'song',
  templateUrl:'../views/song.html',
  providers: [UserService, SongService, PlaylistService]
})

export class SongComponent implements OnInit{
  @Input() song: Song;
  @Input() editorMode: boolean;
  @Output() reloadParent = new EventEmitter();
  public identity;
  public Math: any
  public token;
  public url: string;
  public alertMessage;
  public playlistUser = JSON.parse(localStorage.getItem('PlaylistId'))

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _songService: SongService,
    private _playlistService: PlaylistService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.Math = Math;
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
    let songPlayer = JSON.stringify(song);
    let filePath = this.url + 'get-song-file/' + song.file;
    let imagePath = this.url + 'get-image-album/' + song.album.image;

    localStorage.setItem('soundSong', songPlayer);
    document.getElementById("mp3-source").setAttribute("src", filePath);
    (document.getElementById("player") as any).load();
    (document.getElementById("play").click());

    document.getElementById('play-song-title').innerHTML = song.name;
    document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
    document.getElementById('play-image-album').setAttribute('src', imagePath);
  }

  addInPlaylist(id, song){
    let playlistId = localStorage.getItem("PlaylistId");
    song.playlist.push(JSON.parse(playlistId)._id);
      this._songService.editSong(this.token, id, song).subscribe(
        response => {
          if(!response.song){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'Canción añadida a la playlist!';
            this.song = response.song
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

  pullPlaylist(id, song){
    let playlistId = localStorage.getItem("PlaylistId");
    song.playlist.forEach((item, index)=>{
      if(item == JSON.parse(playlistId)._id){
        song.playlist.splice(index);
      }
    })
      this._songService.editSong(this.token, id, song).subscribe(
        response => {
          if(!response.song){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'Canción eliminada de la playlist';
            this.song = response.song
            console.log(response.song)
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

  puntuation(points, song){
    song.points = song.points + points
    song.votes++
    this._songService.editSong(this.token, song._id, song).subscribe(
      response => {
        if(!response.song){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'puntuada correctamenet';
          this.song = response.song
          console.log(response.song)
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
