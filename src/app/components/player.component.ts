import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';
import  { SongService } from '../services/song.services';
import  { UserService } from '../services/user.services';

@Component({
  selector: 'player',
  templateUrl: '../views/player.html',
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
      //when song ended change next automatically
      song.onended = function() {
        (document.getElementById("next").click());
    };
  }

  nextSong(albumId, songNumber){
    this._songService.getNextSong(this.token, albumId, songNumber).subscribe(
      response => {
        if(!response.song){
          console.log('Error searching the song')
        }else{
          this.song = response.song[0];

          let songPlayer = JSON.stringify(this.song);
          var filePath = this.url + 'get-song-file/' + this.song.file;
          let imagePath = this.url + 'get-image-album/' + this.song.album.image;

          localStorage.setItem('soundSong', songPlayer);

          document.getElementById("mp3-source").setAttribute("src", filePath);
          (document.getElementById("player") as any).load();
          (document.getElementById("play").click());

          document.getElementById('play-song-title').innerHTML = this.song.name;
          document.getElementById('play-song-artist').innerHTML = this.song.album.artist.name;
          document.getElementById('play-image-album').setAttribute('src', imagePath);
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

}
