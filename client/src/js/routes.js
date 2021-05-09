import {Stats} from './routes/Stats';
import {Roster} from './routes/Roster';
import {Schedule} from './routes/Schedule';

export const routes = [
  {path: '/schedule', name: 'Schedule', Component: Schedule},
  {path: '/stats', name: 'Stats', Component: Stats},
  {path: '/roster', name: 'Roster', Component: Roster},
];
