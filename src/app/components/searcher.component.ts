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
  templateUrl:'../views/searcher.html'
})

export class SearcherComponent implements OnInit{
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.title = 'searcher';
  }

  ngOnInit(){
    console.log('searcher component cargado');
  }
}
