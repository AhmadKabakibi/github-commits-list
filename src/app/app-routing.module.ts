import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommitsOverviewComponent } from './components/commits-overview/commits-overview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: 'overview',
        component: CommitsOverviewComponent
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
