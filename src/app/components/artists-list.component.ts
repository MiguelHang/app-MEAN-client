import  { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  { GLOBAL } from '../services/global';
import  { UserService } from '../services/user.services';
import  { ArtistService } from '../services/artist.services';
import { Artist } from '../models/artist';

@Component({
  selector:'artist-list',
  templateUrl:'../views/artists-list.html',
  providers: [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit{
  public title: string;
  public artist: Artist;
  public artists : Artist[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ){
    this.title = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }

  ngOnInit(){
    console.log('Artist component cargado');
    this.getArtists();
  }

  getArtists(){
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      if(!page){
        page = 1;
      }else{
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page == 0){
          this.prev_page = 1;
        }
      }

      this._artistService.getArtists(this.token, page).subscribe(
        (response) =>{
          if(!response.artists){
            this._router.navigate(['/']);
          }else{
            this.artists = response.artists;
          }
        },
        (error) =>{
          console.log(error)
        }
      );
    });
  }

  reload(event):void{
    this.getArtists();
  }
}
