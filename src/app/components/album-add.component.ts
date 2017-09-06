import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { ArtistService } from '../services/artist.services';
import  { AlbumService } from '../services/album.services';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
  selector:'album-add',
  templateUrl:'../views/album-add.html',
  providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit{
  public title: string;
  public artist : Artist;
  public album : Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ){
    this.title = 'Crear album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.album = new Album('', '', 2017, '', '');
  }

  ngOnInit(){
    this._route.params.forEach((params: Params) =>{
      let artist_id = params['artist'];
      this.album.artist = artist_id;
    });
    console.log('Album-add component cargado');

  }

  onSubmit(){
    console.log(this.album)
    this._albumService.addAlbum(this.token, this.album).subscribe(
      response => {
        this.album = response.album;

        if(!response.album){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'El album se ha creado';

          this.album = response.album
          this._router.navigate(['/album-edit', response.album._id]);
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
