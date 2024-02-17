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
export class ViewerComponent implements OnInit {

  public jokeValue: string | undefined;
  public timesChucked: number  = 0;

  public deathJoke: boolean = false;
  public isSensitive: boolean = false;
  public chuckKicked: boolean = false;

  constructor(private http: HttpClient, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar){}

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
      if (response && response.value) {
        this.jokeValue = response.value;
        this.checkForSensitiveContent(this.jokeValue!);
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

  checkForSensitiveContent(jokeValue: string): void {
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
