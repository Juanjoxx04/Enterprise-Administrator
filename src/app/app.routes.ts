import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/shell/layout.component';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];