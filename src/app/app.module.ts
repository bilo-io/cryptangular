import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// 3rd party
import { NgChartsModule } from 'ng2-charts';
// App
import { AppComponent } from './app.component';
// Pages
import { ExploreComponent } from './pages/explore/explore.component';
import { DetailsComponent } from './pages/details/details.component';
import { TransactComponent } from './pages/transact/transact.component';
// Components - App
import { AngularComponent } from './pages/angular/angular.component';
import { NavbarComponent } from './components/app/navbar/navbar.component';
import { PageComponent } from './components/app/page/page.component';
import { ModalComponent } from './components/app/modal/modal.component';
// Components - Core
import { ButtonComponent } from './components/core/button/button.component';
import { InputComponent } from './components/core/input/input.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // Components
    NavbarComponent,
    PageComponent,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    // Pages
    AngularComponent,
    ExploreComponent,
    DetailsComponent,
    TransactComponent,
    // Pipes
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
