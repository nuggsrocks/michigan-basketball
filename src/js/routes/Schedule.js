import React from 'react';
import {ScheduleList} from '../components/ScheduleList';
import {Standings} from '../components/Standings';

export const Schedule = (props) => {
	let {standings, schedule} = props.data;

	if (!standings && !schedule) {
		props.fetchInfo(['standings', 'schedule']);
	}

	return (
		<article className='flex'>
			<ScheduleList standings={standings} schedule={schedule}/>
			<Standings standings={standings}/>
		</article>
	);
}