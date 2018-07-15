import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Start Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CommitsOverviewComponent } from './components/commits-overview/commits-overview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitsOverviewComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
