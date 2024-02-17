import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewerComponent } from './components/viewer/viewer.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo:"viewer", pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'viewer', component: ViewerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
