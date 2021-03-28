import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  public continue_watching: any = ['movie1', 'movie2'];
  public home_data: any = {};
  public curr_movies: any = [];
  public popular_movies: any = [];
  public top_rated_movies: any = [];
  public trending_movies: any = [];
  public popular_tv: any = [];
  public top_rated_tv: any = [];
  public trending_tv: any = [];


  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.fetchHomeData();
    
  }

  fetchHomeData() {
    this.homeService.getHomeData().subscribe((res) => {
      this.home_data = res;
      console.log(this.home_data);
      this.curr_movies = this.home_data.curr_movies;
      this.popular_movies = this.home_data.popular_movies;
      this.top_rated_movies = this.home_data.top_rated_movies;
      this.trending_movies = this.home_data.trending_movies;
      this.popular_tv = this.home_data.popular_tv;
      this.top_rated_tv = this.home_data.top_rated_tv;
      this.trending_tv = this.home_data.trending_tv;

    });
  }
}
