import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { ArtistService } from '../services/artist.services';
import { Artist } from '../models/artist';

@Component({
  selector:'artist-add',
  templateUrl:'../views/artist-add.html',
  providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit{
  public title: string;
  public artist : Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ){
    this.title = 'Crear artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.artist = new Artist('', '', '')
  }

  ngOnInit(){
    console.log('Artist-add component cargado');
  }

  onSubmit(){
    console.log(this.artist);
    this._artistService.addArtist(this.token, this.artist).subscribe(
      response => {
        this.artist = response.artist;

        if(!response.artist){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'El artista se ha creado';

          this.artist = response.artist
          // this._router.navigate(['/editar-artista'], response.artist._id);
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
