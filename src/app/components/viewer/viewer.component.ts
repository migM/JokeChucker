import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  public jokeValue: string | undefined;
  public timesChucked: number  = 0;

  //Variables used to conditionally change image of Chuck next to get new joke button
  public deathJoke: boolean = false;
  public isSensitive: boolean = false;
  public chuckKicked: boolean = false;

  constructor(
    private http: HttpClient, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar){}

  shareJoke(): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: {jokeValue: this.jokeValue},
      height: '55%',
      width: '45%'
    }); 
    dialogRef.afterClosed().subscribe(_ => {
      console.log('The share dialog was closed');
    });
  }

  getJoke(){
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe(
      response => {
        if (response && response.value) {
          this.jokeValue = response.value;
          this.checkForSensitiveContent(this.jokeValue!);
          this.timesChucked ++;
      } else {
        console.error('Chuck is tired of making jokes right now, try again later');
      }
    },
    error =>{
      console.error('Chuck joke not available: ', error);
    }
  );
}

  //copies the text gotten from the API call
  copyText(jokeText: any): void {
      navigator.clipboard.writeText(jokeText)
        .then(() => {
          this.snackBar.open('Text copied to clipboard', 'Close', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  //Function for conditional rendering of different funny images of Chuck depending on text included in the joke retrieved
  checkForSensitiveContent(jokeValue: string): void {

      // Reset all boolean flags to false whenever we call a new joke so the image always refreshes
      this.deathJoke = false;
      this.isSensitive = false;
      this.chuckKicked = false;

      const sensitiveWords: { [key: string]: string[] } = {
        death: ['death', 'kill', 'murder'],
        sensitive: ['two girls one cup', 'rape', 'fuck', 'ejaculation', '9-11'],
        kick: ['kick']
      };
    
      for (const key in sensitiveWords) {
        if (Object.prototype.hasOwnProperty.call(sensitiveWords, key)) {
          const words = sensitiveWords[key];
          
          if (words.some(word => jokeValue.includes(word))) {
            switch (key) {
              case 'death':
                this.deathJoke = true;
                this.isSensitive = false;
                this.chuckKicked = false;

                break;
              case 'sensitive':
                this.isSensitive = true;
                this.chuckKicked = false;
                this.deathJoke = false;

                break;
              case 'kick':
                this.chuckKicked = true;
                this.isSensitive = false;
                this.deathJoke = false;

                break;
            }
            return;
          }
        }
      }
      this.isSensitive = false;
  }
}
