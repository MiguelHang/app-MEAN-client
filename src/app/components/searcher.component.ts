import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

import { UserService } from '../services/user.services';
import { AlbumService } from '../services/album.services';
import { SongService } from '../services/song.services';
import { ArtistService } from '../services/artist.services';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { Artist } from '../models/artist';


@Component({
  selector:'searcher',
  templateUrl:'../views/searcher.html',
  providers: [UserService, AlbumService, ArtistService, SongService]
})

export class SearcherComponent implements OnInit{
  public title: string;
  public albums : Album[];
  public songs: Song[];
  public artists: Artist[];
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public searchText: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService,
    private _songService: SongService
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
      },
      (error) => {
        console.log(error)
      }
    )
  }

  searchSongs(){
    this._songService.getSearchSong(this.token, this.searchText).subscribe(
      (response) => {
        this.songs= response.songs
      },
      (error) => {
        console.log(error)
      }
    )
  }

  searchArtists(){
    this._artistService.getSearchArtist(this.token, this.searchText).subscribe(
      (response) => {
        this.artists= response.artists
      },
      (error) => {
        console.log(error)
      }
    )
  }

  search(text: string){
    this.searchArtists();
    this.searchSongs();
    this.searchAlbums();
  }

}
