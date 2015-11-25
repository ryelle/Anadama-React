// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import PostList from './posts';
import Navigation from './navigation';
import SinglePost from './post';

// Private vars
var _currentSlug, _currentType;

let Controller = {
	passThrough: function( context, next ){
		// Trigger the page load
		next();
	},

	setup: function( context, next ) {
		var path = context.pathname;
		if ( path.substr( -1 ) === '/' ) {
			path = path.substr( 0, path.length - 1 );
		}
		if ( path.length ) {
			_currentSlug = path.substring( path.lastIndexOf( '/' ) + 1 );
		}

		_currentType = 'post';
		if ( ! path.match( /\d{4}\/\d{2}/ ) ) {
			_currentType = 'page';
		}

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
			<SinglePost slug={ _currentSlug } type={ _currentType } />,
			document.getElementById( 'main' )
		);
	},
};

export default Controller;
