import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Person from './person';

//PeopleList
module.exports = React.createClass({
	render: function(){
		var peopleNodes = this.props.data.map(function(person) {
			return (
				<Person login={person.login}>
					{person.first}{person.last}{person.startDate}
				</Person>
			);
		});
		return (
			<div className="peopleList">
				{peopleNodes}
			</div>
		);
	}
});
