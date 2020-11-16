import Schedule from "./components/Schedule";
import Stats from "./components/Stats";
import Roster from "./components/Roster";

const routes = [
    {path: '/schedule', name: 'Schedule', Component: Schedule},
    {path: '/stats', name: 'Stats', Component: Stats},
    {path: '/roster', name: 'Roster', Component: Roster}
];

export default routes;