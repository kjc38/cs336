import React from 'react';
import $ from 'jquery';

import CommentList from './commentList';
import CommentForm from './commentForm';
import { store, ActionTools } from './flux';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
	this.setState({data: newComments});
	store.dispatch(ActionTools.addComment(comment));
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: comments});
             console.error(API_URL, status, errorThrown.toString());
	}.bind(this));
	componentWillMount() {
		this.unsubscribe = store.subscribe(() => {
			this.setState({
				data: store.getState().data
			});
    		});
    	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
