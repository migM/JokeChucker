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
  }


}




