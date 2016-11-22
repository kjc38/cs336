import React from 'react';
import $ from 'jquery';

import PeopleList from './peopleList';
import PeopleForm from './peopleForm';

//PeopleBox

module.exports = React.createClass({
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
		})
		.done(function(result){
			this.setState({data: result});
		}.bind(this))
		.fail(function(xhr, status, errorThrown) {
			console.error(this.props.url, status, errorThrown.toString());
		}.bind(this));
	},
	handlePersonSubmit: function(person) {
		var people = this.state.data;
		//comment.id = Date.now();
		var newPeople = people.concat([person]);
		this.setState({data: newPeople});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: person,
		})
		.done(function(result){
			this.setState({data: result});
		}.bind(this))
		.fail(function(xhr, status, errorThrown) {
			this.setState({data: comments});
			console.error(this.props.url, status, errorThrown.toString());
		}.bind(this));
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function() {
		this.loadPeopleFromServer();
		setInterval(this.loadPeopleFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="peopleBox">
				<h1>People</h1>
				<PeopleList data={this.state.data} />
				<PeopleForm onPersonSubmit=		
					{this.handlePersonSubmit} />
			</div>
		);
	}
});
