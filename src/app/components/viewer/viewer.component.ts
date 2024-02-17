import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  jokeValue: string | undefined;
  timesChucked: number  = 0;

  constructor(private http: HttpClient, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getJoke();
  }

  shareJoke(): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: {jokeValue: this.jokeValue},
      height: '40%',
      width: '45%'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The share dialog was closed');
    });
  }

  anotherJoke(): void{
    this.timesChucked ++;

  }

  getJoke(){
    this.timesChucked ++;
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
