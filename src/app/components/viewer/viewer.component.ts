import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

  //variable for passing categories in API call
  public category: string = '';

  constructor(
    private http: HttpClient, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar){}

  //Opens modal component intended to share joke attained 
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

  //makes call to Chuck Norris jokes API to get random joke when no categories are selected, and gets joke by category if such argument is provided
  getJoke() {
    let apiUrl = 'https://api.chucknorris.io/jokes/random';
    
    // Append category to the apiUrl if category is not empty
    if (this.category) {
      apiUrl += `?category=${this.category}`;
    }
  
    this.http.get<any>(apiUrl).subscribe(
      (response: any) => {
        if (response && response.value) {
          this.jokeValue = response.value;
          this.checkForSensitiveContent(this.jokeValue!);
          this.timesChucked ++;
        } else {
          console.error('Chuck is tired of making jokes right now, try again later');
        }
      },
      error => {
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
        sensitive: [ 'fuck'],
        kick: ['kick']
      };
    
      for (const key in sensitiveWords) {
        if (Object.prototype.hasOwnProperty.call(sensitiveWords, key)) {
          const words = sensitiveWords[key];
          
          if (words.some(word => jokeValue.includes(word))) {
            switch (key) {
              case 'death':
                this.deathJoke = true;
                break;

              case 'sensitive':
                this.isSensitive = true;
                break;

              case 'kick':
                this.chuckKicked = true;
                break;

            }
            return;
          }
        }
      }
  }

  //handles the category selected in the dropdown on modal component so we pass whatever value is in it to the API call
  onCategorySelected(category: string): void {
    switch (category) {
      case 'celebrity':
        this.category = 'celebrity';
        break;

      case 'political':
        this.category = 'political';
        break;

      case 'dev':
        this.category = 'dev';
        break;

      case 'random':
          this.category = '';
          break;

      default:
        this.category = '';
        break;

    }
  }
}
