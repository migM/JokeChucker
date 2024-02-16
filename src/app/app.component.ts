import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'JokeChucker';
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
