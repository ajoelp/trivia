import { Navigate, RouteObject, useRoutes, generatePath, useLocation } from 'react-router-dom';
import { LazyExoticComponent, Suspense } from 'react';
import { RouteInstance } from './shared';
import { RouteNames, ROUTES } from './routes';

type RouteProps = {
    Component: LazyExoticComponent<any>;
    auth?: boolean;
};

function Route({ Component, auth = false }: RouteProps) {
    const location = useLocation();

    if (auth && true) {
        return <Navigate to={getPathByName(RouteNames.LOGIN, {}, { redirect: location.pathname })} />;
    }
    return (
        <Suspense fallback={null}>
            <Component />
        </Suspense>
    );
}

type FlatRouteList = Omit<RouteInstance, 'children'>[];

const flattenRoutes = (routes: RouteInstance[], prefix?: string) => {
    return routes.reduce<FlatRouteList>((carry, { children, path, ...route }) => {
        const pathWithPrefix = [prefix, path].filter(Boolean).join('/') as string;

        if (children && children.length > 0) {
            carry.push(...flattenRoutes(children));
        }

        carry.push({
            ...route,
            path: pathWithPrefix,
        });

        return carry;
    }, []);
}

const FlatRoutes: FlatRouteList = flattenRoutes(ROUTES);
type Params = Record<string, any>;

function getPathByName(name: RouteNames, params: Params = {}, query: Params = {}) {
    const route = FlatRoutes.find((a) => a.name === name);
    if (!route || !route.path) return '/';
    let queryString = '';
    if (query && Object.keys(query).length > 0) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }
    return `${generatePath(route.path, params)}${queryString}`;
}

function parseRoutes(routes: RouteInstance[]): RouteObject[] {
    return routes.map<RouteObject>(({ children, name, title, auth, breadcrumbs, component, ...rest }) => {
        return {
            children: children ? parseRoutes(children) : undefined,
            element: <Route Component={component} auth={auth} />,
            ...rest,
        };
    });
}

export const Routes = () => {
    return useRoutes(parseRoutes(ROUTES));
};