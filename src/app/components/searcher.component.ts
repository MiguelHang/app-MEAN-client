import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

import { UserService } from '../services/user.services';
import { AlbumService } from '../services/album.services';
import { SongService } from '../services/song.services';
import { Album } from '../models/album';
import { Song } from '../models/song';


@Component({
  selector:'searcher',
  templateUrl:'../views/searcher.html',
  providers: [UserService, AlbumService]
})

export class SearcherComponent implements OnInit{
  public title: string;
  public albums : Album[];
  public songs: Song[];
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public searchText: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ){
    this.title = 'searcher';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this.searchText = '';
  }

  ngOnInit(){
    console.log('searcher component cargado');
  }

  searchAlbums(){
    this._albumService.getSearchAlbums(this.token, this.searchText).subscribe(
      (response) => {
        this.albums= response.albums
        console.log(this.albums)
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
