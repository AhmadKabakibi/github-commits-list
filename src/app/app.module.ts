import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Start Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CommitsOverviewComponent } from './components/commits-overview/commits-overview.component';
import { CommitsFilterComponent } from './components/commits-filter/commits-filter.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FirstLinePipe } from './pipes/first-line-pipe';

// Start app - wide services
import { HttpClientModule } from '@angular/common/http';
import { GITHUB_REPO, TOKEN , GithubApiService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    CommitsOverviewComponent,
    NotFoundComponent,
    FirstLinePipe,
    CommitsFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    GithubApiService,
    {
      provide: GITHUB_REPO,
      useValue: 'angular/material2'
    },
    {
      provide: TOKEN,
      useValue: '4d4c507a100ee750d22e2b185b0c477c8eac2ae9'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
