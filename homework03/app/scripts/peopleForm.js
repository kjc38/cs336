import React from 'react';
import $ from 'jquery';

//PeopleForm
module.exports = React.createClass({
	getInitialState: function() {
		return {login: '', first: '', last: '', startDate: ''};
	},
	handleLoginChange: function(e) {
		this.setState({login: e.target.value});
	},
	handleFirstChange: function(e) {
		this.setState({first: e.target.value});
	},
	handleLastChange: function(e) {
		this.setState({last: e.target.value});
	},
	handleStartChange: function(e) {
		this.setState({startDate: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var login = this.state.login.trim();
		var first = this.state.first.trim();
		var last = this.state.last.trim();
		var startDate = this.state.startDate.trim();
		if (!login || !first || !last || !startDate) {
			return;
		}
		this.props.onPersonSubmit({login: login, first: first, last: last, startDate: startDate});
		this.setState({login: '', first: '', last: '', startDate: ''});
	},
	render: function() {
		return (
			<form className="peopleForm" onSubmit={this.handleSubmit}>
				<input 
					className="ui-widget ui-corner-all"
					type="text"
					placeholder="Login" 
					value={this.state.login}
					onChange={this.handleLoginChange}
				/>
				<input 
					className="ui-widget ui-corner-all"
					type="text"
					placeholder="First name" 
					value={this.state.first}
					onChange={this.handleFirstChange}
				/>
				<input 
					className="ui-widget ui-corner-all"
					type="text"
					placeholder="Last name" 
					value={this.state.Last}
					onChange={this.handleLastChange}
				/>
				<input 
					className="ui-widget ui-corner-all"
					type="text" 
					placeholder="Start date" 
					value={this.state.startDate}
					onChange={this.handleStartChange}
				/>
				<input
					className="ui-button ui-widget ui-corner-all" 
					type="submit" 
					value="Post" />
			</form>
		);
	}
});
