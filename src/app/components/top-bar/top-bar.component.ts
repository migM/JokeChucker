import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
  category:string = '';
  
  constructor(
    private http: HttpClient ){}


  getJokeByCategory(category: string) {
    
    this.categorySelected.emit(category);
    // const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;

    // this.http.get(apiUrl).subscribe(
    //   (response: any) => {
    //     console.log('Random joke from category', category, ':', response.value);
    //   },
    //   error => {
    //     console.error('Error fetching Chuck Norris joke:', error);
    //   }
    // );
  }


}




