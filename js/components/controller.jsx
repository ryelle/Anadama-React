// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import PostList from './posts';
import Navigation from './navigation';
import SinglePost from './post';

// Private vars
var _currentPost;

let Controller = {
	passThrough: function( context, next ){
		// Trigger the page load
		next();
	},

	setup: function( context, next ) {
		_currentPost = context.params.slug || false;
		next();
	},

	navigation: function( context, next ) {
		ReactDOM.render(
			<Navigation />,
			document.getElementById( 'site-navigation' )
		);

		next();
	},

	posts: function() {
		ReactDOM.render(
			<PostList />,
			document.getElementById( 'main' )
		);
	},

	post: function( context ) {
		ReactDOM.render(
			<SinglePost slug={ _currentPost } />,
			document.getElementById( 'main' )
		);
	},

	page: function( context ) {
		ReactDOM.render(
			<SinglePost slug={ _currentPost } />,
			document.getElementById( 'main' )
		);
	},
};

export default Controller;
