import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.scss'
})
export class ShareModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  //closes modal
  closeModal(): void {
    this.dialogRef.close();
  }

  //copies the joke and opens the user's default e-mail client so he can share it
  sendEmail(jokeText : string) : void {
    const mailTo = `mailto:`;

    this.copyText(jokeText);
    window.location.href = mailTo;

  }

  //copies the joke and opens Twitter/X page so user can share it
  tweet(jokeText: string): void { 
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;

    window.location.href = twitterShareUrl;
  }

  //copies the text gotten from the API call
  copyText(jokeText: string): void {
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
}
