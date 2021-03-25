import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';
import { MylistComponent } from './components/mylist/mylist.component';

// const routes: Routes = [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'tv/:id',
    component: TvComponent,
  },
  {
    path: 'mylist',
    component: MylistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
