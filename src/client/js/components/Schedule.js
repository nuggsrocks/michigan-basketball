import React from 'react';
import {ScheduleList} from './ScheduleList';
import {Standings} from './Standings';

export const Schedule = (props) => {

	return (
		<div>
			<ScheduleList data={props.data}/>
			<Standings data={props.data}/>
		</div>
	);
};