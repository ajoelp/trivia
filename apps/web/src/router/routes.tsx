import { RouteInstance } from './shared';
import { lazy } from 'react';

export enum RouteNames {
    DASHBOARD = 'dashboard',
    LOGIN = 'login',
}

export const ROUTES: RouteInstance[] = [
    {
        path: '/',
        name: RouteNames.DASHBOARD,
        component: lazy(() => import('../screens/dashboard')),
        title: 'Dashboard',
        auth: true,
    },
    {
        path: '/auth/login',
        name: RouteNames.LOGIN,
        component: lazy(() => import('../screens/login')),
        title: 'Login',
    },
];