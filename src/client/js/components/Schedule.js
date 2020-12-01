import {getStatLeaders} from './StatLeaders';
import {getScheduleList} from './ScheduleList';
import {getStandings} from './Standings';


export const getSchedule = async () => {
	try {
		const {default: React} = await import('react');
		const StatLeaders = await getStatLeaders();
		const ScheduleList = await getScheduleList();
		const Standings = await getStandings();

		 return (props) => {

			return (
				<div>
					<StatLeaders data={props.data}/>
					<ScheduleList data={props.data}/>
					<Standings data={props.data}/>
				</div>
			);
		};
	} catch(e) {
	    console.error(e);
	}
};