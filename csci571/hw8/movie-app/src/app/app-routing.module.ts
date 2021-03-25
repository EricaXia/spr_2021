import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { MylistComponent } from './mylist/mylist.component';

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
