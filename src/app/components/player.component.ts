import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';
import  { SongService } from '../services/song.services';
import  { UserService } from '../services/user.services';

@Component({
  selector: 'player',
  template:`
      <div class='player'>
        <div class='album-image'>
          <span *ngIf='song.album'>
            <img id='play-image-album' src="{{url + 'get-image-album/' + song.album.image}}">
          </span>
          <span *ngIf='!song.album'>
          <img id='play-image-album' src='assets/images/default.png'>
          </span>
        </div>
        <div class="audio-file">
          <span id="play-song-title">
            {{song.name}}
          </span>
          |
          <span id="play-song-artist">
            <span *ngIf='song.artist'>
              {{song.album.artist.name}}
            </span>
          </span>
          <audio  id='player'>
            <source id='mp3-source' src="{{url + 'get-song-file/' + song.file }}" type="audio/mpeg">
            Tu navegador no es compatible
          </audio>
        </div>
        <div class="controls">
          <span class="prevSong glyphicon glyphicon-backward" id="pres" (click)="prevSong()"></span>
          <span *ngIf='!sound' class="playSong glyphicon glyphicon-play" id="play" (click)="playPause()"></span>
          <span *ngIf='sound' class="playSong glyphicon glyphicon-pause" id="play" (click)="playPause()"></span>
          <span class="nextSong glyphicon glyphicon-forward" id="next" (click)="nextSong(song.album._id, song.number)"></span>
        </div>
      </div>
    `,
    providers: [UserService, SongService]
})

export class PlayerComponent implements OnInit{

  public url: string;
  public song;
  public sound: boolean;
  public token;

  constructor(
    private _songService: SongService,
    private _userService: UserService
  ){
    this.url= GLOBAL.url;
    this.token = this._userService.getToken();
    this.song = new Song(1, "", "", "", "", 0, 0, []);
    this.sound = false;
  }

  ngOnInit(){
    console.log('Player cargado')

    let song = JSON.parse(localStorage.getItem('soundSong'));

    if(song){
      this.song = song
    }else{
      this.song = new Song(1, "", "", "", "", 0, 0, []);
    }
  }

  playPause(){
    let song = document.getElementsByTagName("audio")[0];
    this.sound = song.paused;
      if(this.sound){
        song.play()
      }else{
        song.pause()
      }
  }

  nextSong(albumId, songNumber){
    this._songService.getNextSong(this.token, albumId, songNumber).subscribe(
      response => {
        this.song = response.song;

        if(!response.song){
          console.log('Error searching the song')
        }else{
          this.song = response.song
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          // let body = JSON.parse(error._body)
          console.log(error);
        }
      }
    );
  }

  prevSong(){
    console.log('Anterior canción del album')
  }

}
