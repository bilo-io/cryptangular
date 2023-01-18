import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularComponent } from './pages/angular/angular.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { DetailsComponent } from './pages/details/details.component';
import { TransactComponent } from './pages/transact/transact.component';

const routes: Routes = [
  {
    path: 'angular', component: AngularComponent,
    title: 'Cryptangular - Angular 101'
  },
  {
    path: 'explore',
    component: ExploreComponent,
    title: 'Explore Crypto currencies',
    // children: [
    //   {
    //     path: ':id',
    //     component: DetailsComponent,
    //     title: 'Explore Crypto details',
    //   }
    // ]
  },
  {
    path: 'explore/:id',
    component: DetailsComponent,
    title: 'Explore Crypto details',
  },
  {
    path: 'transact',
    title: 'Trade Crypto currencies',
    component: TransactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
