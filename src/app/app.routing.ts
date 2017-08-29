import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import home
import{ HomeComponent } from './components/home.component';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import Artist
import{ ArtistListComponent} from './components/artists-list.component';
import{ ArtistAddComponent } from './components/artist-add.component';



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'artists/:page', component: ArtistListComponent},
  {path: 'artist-add', component: ArtistAddComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);