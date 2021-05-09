import React from 'react';
import {ScheduleList} from '../components/ScheduleList';
import {Standings} from '../components/Standings';
import PropTypes from 'prop-types';

export const Schedule = (props) => {
  const {standings, schedule} = props.data;

  if (!standings && !schedule) {
    props.fetchInfo(['standings', 'schedule']);
  }

  return (
    <article className='flex'>
      <ScheduleList standings={standings} schedule={schedule}/>
      <Standings standings={standings}/>
    </article>
  );
};

Schedule.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
};
