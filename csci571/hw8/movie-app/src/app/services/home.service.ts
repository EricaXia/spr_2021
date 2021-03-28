import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getHomeData() {
    let URL = "http://localhost:3000"
    return this.httpClient.get(URL);
  }
}
