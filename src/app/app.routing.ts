import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import home
import{ HomeComponent } from './components/home.component';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import Artist
import{ ArtistListComponent} from './components/artists-list.component';
import{ ArtistAddComponent } from './components/artist-add.component';
import{ ArtistEditComponent } from './components/artist-edit.component';
import{ ArtistDetailComponent } from './components/artist-detail.component';

//import Album
import{ AlbumAddComponent } from './components/album-add.component';
import{ AlbumEditComponent } from './components/album-edit.component';
import{ AlbumDetailComponent } from './components/album-detail.component';
import{ AlbumListComponent } from './components/albums-list.component';

//import song
import{ SongAddComponent } from './components/song-add.component';
import{ SongEditComponent } from './components/song-edit.component';

import{ SearcherComponent} from './components/searcher.component';

const appRoutes: Routes = [
  {path: 'search', component: SearcherComponent},
  {path: 'song-edit/:id', component: SongEditComponent},
  {path: 'song-add/:album', component: SongAddComponent},
  {path: 'albums/:page', component: AlbumListComponent},
  {path: 'album-detail/:id', component: AlbumDetailComponent},
  {path: 'album-add/:artist', component: AlbumAddComponent},
  {path: 'album-edit/:id', component: AlbumEditComponent},
  {path: 'artists/:page', component: ArtistListComponent},
  {path: 'artist-add', component: ArtistAddComponent},
  {path: 'artist-edit/:id', component: ArtistEditComponent},
  {path: 'artist-detail/:id', component: ArtistDetailComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
