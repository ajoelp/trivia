import { RouteInstance } from './shared';
import { lazy } from 'react';

export enum RouteNames {
    GAME_SETUP = 'game-setup',
    DASHBOARD = 'dashboard',
    LOGIN = 'login',
}

export const ROUTES: RouteInstance[] = [
    {
        path: '/game-setup',
        name: RouteNames.GAME_SETUP,
        component: lazy(() => import('../screens/game-setup/Layout')),
        title: 'Game Setup',
        auth: true,
        children: [
            {
                path: '',
                name: RouteNames.DASHBOARD,
                component: lazy(() => import('../screens/game-setup/dashboard')),
                title: 'Dashboard'
            }
        ]
    },
    {
        path: '/auth/login',
        name: RouteNames.LOGIN,
        component: lazy(() => import('../screens/login')),
        title: 'Login',
    },
];
