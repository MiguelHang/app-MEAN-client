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

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent
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
