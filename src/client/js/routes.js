import {lazy} from 'react';

const routes = [
    {path: '/schedule', name: 'Schedule', Component: lazy(() => import('./components/Schedule'))},
    {path: '/stats', name: 'Stats', Component: lazy(() => import('./components/Stats'))},
    {path: '/roster', name: 'Roster', Component: lazy(() => import('./components/Roster'))}
];

export default routes;