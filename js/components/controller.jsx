// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import PostList from './posts';
import Navigation from './navigation';

// Private vars
var _currentPost;
var _firstRun = true;

let Controller = {
	passThrough: function( context, next ){
		// Trigger the page load
		next();
	},

	setup: function( context, next ) {
		_currentPost = parseInt( context.params.id ) || false;
		_firstRun = false;
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
};

export default Controller;
