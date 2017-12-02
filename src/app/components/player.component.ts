import {Component, OnInit,Input} from '@angular/core';
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
  @Input() song: Song;
  public url: string;
  public sound: boolean;
  public token;

  constructor(
    private _songService: SongService,
    private _userService: UserService
  ){
    this.url= GLOBAL.url;
    this.token = this._userService.getToken();
    // this.song = new Song(1, "", "", "", "", 0, 0, []);
    this.sound = false;

  }

  ngOnInit(){
    console.log('Player cargado')

    let songLast = JSON.parse(localStorage.getItem('soundSong'));
    if(songLast){
      this.song = songLast
    }else{
      this.song = new Song(1, "", "", "", "", 0, 0, []);
    }
  }

  playPause(){
    this.song = JSON.parse(localStorage.getItem('soundSong'));
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
    this._songService.getNextSong(this.token, albumId, parseInt(songNumber)+1).subscribe(
      response => {
        if(!response.song[0]){
          console.log('Error searching the song')
        }else{
          let nextSong = response.song[0];
          this.song = nextSong
          let songPlayer = JSON.stringify(nextSong);
          var filePath = this.url + 'get-song-file/' + nextSong.file;
          let imagePath = this.url + 'get-image-album/' + nextSong.album.image;

          localStorage.setItem('soundSong', songPlayer);

          document.getElementById("mp3-source").setAttribute("src", filePath);
          (document.getElementById("player") as any).load();
          (document.getElementById("play").click());

          document.getElementById('play-song-title').innerHTML = nextSong.name;
          document.getElementById('play-song-artist').innerHTML = nextSong.album.artist.name;
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

  prevSong(albumId, songNumber){
    songNumber<2 ? songNumber=2 : songNumber
    this._songService.getNextSong(this.token, albumId, parseInt(songNumber)-1).subscribe(
      response => {
        if(!response.song[0]){
          console.log('Error searching the song')
        }else{
          let nextSong = response.song[0];
          this.song = nextSong
          let songPlayer = JSON.stringify(nextSong);
          var filePath = this.url + 'get-song-file/' + nextSong.file;
          let imagePath = this.url + 'get-image-album/' + nextSong.album.image;

          localStorage.setItem('soundSong', songPlayer);

          document.getElementById("mp3-source").setAttribute("src", filePath);
          (document.getElementById("player") as any).load();
          (document.getElementById("play").click());

          document.getElementById('play-song-title').innerHTML = nextSong.name;
          document.getElementById('play-song-artist').innerHTML = nextSong.album.artist.name;
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
