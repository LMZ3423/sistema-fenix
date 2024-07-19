import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'inventory',
                loadComponent: () => import('./business/inventory/inventory.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'add-new-product',
                loadComponent: () => import('./business/add-new-product/add-new-product.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'product-input',
                loadComponent: () => import('./business/product-input/product-input.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'product-output',
                loadComponent: () => import('./business/product-output/product-output.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'history',
                loadComponent: () => import('./business/history/history.component'),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'inventory',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'inventory'
    }
];
