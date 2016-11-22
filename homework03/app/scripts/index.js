import React from 'react';
import ReactDOM from 'react-dom';

import PeopleBox from './peopleBox';
import Person from './person';

import '../css/base.css';

ReactDOM.render(
	<PeopleBox url="/api/people" pollInterval={2000} />,
	document.getElementById('content')
);
