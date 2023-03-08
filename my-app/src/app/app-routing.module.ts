import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'selection/:id', component: SelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
