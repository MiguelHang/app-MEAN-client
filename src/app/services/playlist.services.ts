import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Playlist } from '../models/playlist';


@Injectable()
export class PlaylistService{
  public url: string;

  constructor(private _http: Http ){
    this.url = GLOBAL.url;
  }

  addPlaylist(token, playlist: Playlist){
    let params = JSON.stringify(playlist);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url + 'playlist', params, {headers: headers}).map( res => res.json());
  }

  getPlaylist(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'playlist/'+id, options). map( res => res.json());
  }

  // editPlaylist(token, id: string ,playlist: Playlist){
  //   let params = JSON.stringify(playlist);
  //   let headers = new Headers({
  //     'Content-Type':'application/json',
  //     'Authorization':token
  //   });
  //
  //   return this._http.put(this.url + 'playlist/'+ id, params, {headers: headers}).map( res => res.json());
  // }

  // getPlaylist(token, userPlaylistId){
  //   let headers = new Headers({
  //     'Content-Type':'application/json',
  //     'Authorization':token
  //   });
  //   let options = new RequestOptions({headers:headers});
  //   if(userPlaylistId == null){
  //     return this._http.get(this.url+'playlist', options). map( res => res.json());
  //   }else{
  //     return this._http.get(this.url+'playlist/'+ userPlaylistId, options). map( res => res.json());
  //   }
  // }
  //
  // getSearchAlbums(token, text: string){
  //   let headers = new Headers({
  //     'Content-Type':'application/json',
  //     'Authorization':token
  //   });
  //   let options = new RequestOptions({headers:headers});
  //   if(text == null){
  //     return this._http.get(this.url+'searchalbums/'+ '', options). map( res => res.json());;
  //   }else{
  //     return this._http.get(this.url+'searchalbums/'+ text, options). map( res => res.json());
  //   }
  // }
  //
  // deleteAlbum(token, id: string){
  //   let headers = new Headers({
  //     'Content-Type':'application/json',
  //     'Authorization':token
  //   });
  //   let options = new RequestOptions({headers:headers});
  //   return this._http.delete(this.url+'album/'+id, options). map( res => res.json());
  // }

}
