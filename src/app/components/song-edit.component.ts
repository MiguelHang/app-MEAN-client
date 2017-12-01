import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { SongService } from '../services/song.services';
import  { UploadService } from '../services/upload.service';
import { Song } from '../models/song';

@Component({
  selector:'song-edit',
  templateUrl:'../views/song-add.html',
  providers: [UserService, SongService, UploadService]
})

export class SongEditComponent implements OnInit{
  public title: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _songService: SongService,
    private _uploadService: UploadService
  ){
    this.title = 'Editar canción';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.isEdit = true;

    this.song = new Song(1, '', '', '', '', 0, 0, []);
  }

  ngOnInit(){

    console.log('Song-edit component cargado');
    this.getSong();
  }

  getSong(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._songService.getSong(this.token, id).subscribe(

        response => {
          if(!response.song){
            this._router.navigate(['/']);
          }else{
            this.song = response.song;
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
    });
  }

  onSubmit(){

    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      console.log(this.song)
      this._songService.editSong(this.token, id, this.song).subscribe(
        response => {
          if(!response.song){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'La canción se ha actualizado!';
            this.song = response.song

            if(!this.filesToUpload){
              this._router.navigate(['/album-detail', response.song.album]);
            }else{
              // subir el fichero
              this._uploadService.makeFileRequest(this.url + 'upload-file-song/' + id, [], this.filesToUpload, this.token, 'file')
                .then(
                  (result) =>{
                    this._router.navigate(['/album-detail', response.song.album]);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }
            // this._router.navigate(['/song-edit', response.song._id]);
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
    });
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
