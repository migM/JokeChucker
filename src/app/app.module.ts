import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareModalComponent } from './components/share-modal/share-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    ShareModalComponent,
    ShareModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
