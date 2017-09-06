import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { UploadService } from '../services/upload.service';
import  { AlbumService } from '../services/album.services';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
  selector:'artist-edit',
  templateUrl:'../views/album-add.html',
  providers: [UserService, AlbumService, UploadService]
})

export class AlbumEditComponent implements OnInit{
  public title: string;
  public album : Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _uploadService: UploadService
  ){
    this.title = 'Editar album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.album = new Album('', '', 2017, '', '');
    this.isEdit = true;
  }

  ngOnInit(){
    console.log('Album-edit component cargado');
    this.getAlbum();
  }

  getAlbum(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        response => {
          this.album = response.album;

          if(!response.album){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.album = response.album
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
    console.log(this.album)
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

    this._albumService.editAlbum(this.token, id, this.album).subscribe(
        response => {
          this.album = response.album;

          if(!response.album){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El album se ha actualizado';
            if(!this.filesToUpload){
              this._router.navigate(['/artist-detail', response.album.artist]);
            }else{
              this._uploadService.makeFileRequest(this.url + 'upload-image-album/' + id, [], this.filesToUpload, this.token, 'image')
                .then(
                  (result) =>{
                    this._router.navigate(['/artist-detail', response.album.artist]);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
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
