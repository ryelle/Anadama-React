// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
// import API from 'utils/api';
import PostList from './posts';
import Navigation from './navigation';

// Private vars
var _currentPost;
var _firstRun = true;

let Controller = {
	setup: function( context, next ) {
		_currentPost = parseInt( context.params.id ) || false;

		// Call API.
		// if ( _currentPost ) {
		// 	getPost( _currentPost );
		// } else {
		// 	getPosts();
		// }

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
