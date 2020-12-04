import {Stats} from './components/Stats';
import {Roster} from './components/Roster';
import {Schedule} from './components/Schedule';

export const routes = [
    {path: '/schedule', name: 'Schedule', Component: Schedule},
    {path: '/stats', name: 'Stats', Component: Stats},
    {path: '/roster', name: 'Roster', Component: Roster}
];