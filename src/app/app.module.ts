import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{ routing, appRoutingProviders} from './app.routing';


import{ HomeComponent } from './components/home.component';
import { AppComponent } from './app.component';
import{ UserEditComponent } from './components/user-edit.component';

import{ ArtistListComponent } from './components/artists-list.component';
import{ ArtistAddComponent } from './components/artist-add.component';
import{ ArtistEditComponent } from './components/artist-edit.component';
import{ ArtistDetailComponent } from './components/artist-detail.component';

import{ AlbumAddComponent } from './components/album-add.component';
import{ AlbumEditComponent } from './components/album-edit.component';
import{ AlbumDetailComponent } from './components/album-detail.component';

import{ SongAddComponent } from './components/song-add.component';
import{ SongEditComponent } from './components/song-edit.component';

import{ PlayerComponent} from './components/player.component';



@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
