import {getStats} from './components/Stats';
import {getRoster} from './components/Roster';
import {getSchedule} from './components/Schedule';

export const getRoutes = async () => {
    try {
        const Schedule = await getSchedule();
        const Stats = await getStats();
        const Roster = await getRoster();

        return [
            {path: '/schedule', name: 'Schedule', Component: Schedule},
            {path: '/stats', name: 'Stats', Component: Stats},
            {path: '/roster', name: 'Roster', Component: Roster}
        ];
    } catch(e) {
        console.error(e);
    }
};