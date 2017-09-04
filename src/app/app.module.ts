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



@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent
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
