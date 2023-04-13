import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { aboutGuard } from '../counter.guard';
import { canActivateCounter } from './guards/counter.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'counter',
    loadComponent: () => import('./counter/counter.component').then(mod => mod.CounterComponent),
    canActivate: [canActivateCounter]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
