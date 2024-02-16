import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  jokeValue: string | undefined;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getJoke();
  }

  getJoke(){
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe(
      response => {
        this.jokeValue = response.value;
      },
      error =>{
        console.error('Chuck is tired of making jokes right now, try again later', error);
      }
    );
  }
}
