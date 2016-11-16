import React from 'react';
import $ from 'jquery';

import CommentList from './commentList';
import CommentForm from './commentForm';

//CommentBox

module.exports = React.createClass({
	loadCommentsFromServer: function() {
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
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
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
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit=		
					{this.handleCommentSubmit} />
			</div>
		);
	}
});
