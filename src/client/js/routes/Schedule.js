import React from 'react';
import {ScheduleList} from '../components/ScheduleList';
import {Standings} from '../components/Standings';

export const Schedule = (props) => {

	return (
		<article className='flex'>
			<ScheduleList data={props.data}/>
			<Standings data={props.data}/>
		</article>
	);
}