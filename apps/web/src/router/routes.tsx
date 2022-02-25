import { RouteInstance } from './shared';
import { lazy } from 'react';

export enum RouteNames {
    GAME_SETUP = 'game-setup',
    DASHBOARD = 'dashboard',
    LOGIN = 'login',
    NOT_FOUND = 'not-found',
    ROOT = 'root'
}

export const ROUTES: RouteInstance[] = [
    {
        path: '/',
        name: RouteNames.ROOT,
        title: 'Trivia',
        component: lazy(() => import('../screens/root-page'))
    },
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
    { path: "*", name: RouteNames.NOT_FOUND, title: 'Not Found', component: lazy(() => import('../screens/not-found')) },
];
