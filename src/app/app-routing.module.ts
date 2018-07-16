import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommitsOverviewComponent } from './components/commits-overview/commits-overview.component';
import { CommitDetailsComponent } from './components/commit-details/commit-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: 'overview',
        component: CommitsOverviewComponent
    },
    {
        path: 'commit/:sha',
        component: CommitDetailsComponent
    },
    {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
