import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { ArtistService } from '../services/artist.services';
import  { UploadService } from '../services/upload.service';
import { Artist } from '../models/artist';

@Component({
  selector:'artist-edit',
  templateUrl:'../views/artist-add.html',
  providers: [UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit{
  public title: string;
  public artist : Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService: UploadService
  ){
    this.title = 'Editar artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.artist = new Artist('', '', '')
    this.isEdit = true;
  }

  ngOnInit(){
    console.log('Artist-add component cargado');
    this.getArtist()
  }

  getArtist(){
    this._route.params.forEach( (params: Params) => {
      let id = params['id'];

      this._artistService.getArtist(this.token, id).subscribe(
        response => {
          this.artist = response.artist;
          if(!response.artist){
            this._router.navigate(['/']);
          }else{
            this.artist = response.artist;
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
    });
  }

  onSubmit(){
    console.log(this.artist);
    this._route.params.forEach( (params: Params) => {
      let id = params['id'];

      this._artistService.editArtist(this.token, this.artist, id).subscribe(
        response => {
          // this.artist = response.artist;

          if(!response.artist){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El artista se ha actualizado';
            if(!this.filesToUpload){
              this._router.navigate(['/artist-detail', response.artist._id]);
            }else{
              //Upload image
              this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'image')
                .then(
                  (result) =>{
                    this._router.navigate(['/artist-detail', response.artist._id]);

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
