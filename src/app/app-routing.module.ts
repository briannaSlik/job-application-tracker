import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationListComponent } from './applications/application-list/application-list.component';
import { ApplicationCreateComponent } from './applications/application-create/application-create.component';

const routes: Routes = [
  { path: '', component: ApplicationListComponent },
  { path: 'create', component: ApplicationCreateComponent },
  { path: 'edit/:id', component: ApplicationCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
