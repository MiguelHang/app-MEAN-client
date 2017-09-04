import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { ArtistService } from '../services/artist.services';
import { Artist } from '../models/artist';

@Component({
  selector:'artist-detail',
  templateUrl:'../views/artist-detail.html',
  providers: [UserService, ArtistService]
})

export class ArtistDetailComponent implements OnInit{
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
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
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

            //obtener los albums del artista
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

}
