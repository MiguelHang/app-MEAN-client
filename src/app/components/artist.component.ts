import  { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import { Artist } from '../models/artist';
import  { ArtistService } from '../services/artist.services';



@Component({
  selector:'artist',
  templateUrl:'../views/artist.html',
  providers: [UserService, ArtistService]
})

export class ArtistComponent implements OnInit{
  @Input() artist: Artist;
  @Output() reloadParent = new EventEmitter();
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
    console.log('artist component cargado');
  }

  public confirmado
    onDeleteConfirm(id){
      this.confirmado = id;
    }

    onCancelArtist(){
      this.confirmado = null;
    }

    onDeleteArtist(id){
      this._artistService.deleteArtist(this.token, id).subscribe(
        (response) =>{
          if(!response.artist){
            alert('Error en el servidor');
          }
          // this.getArtists();
          this.reloadParent.emit({artist: response.artist._id});
        },
        (error) =>{
          console.log(error)
        }
      );
    }
}
