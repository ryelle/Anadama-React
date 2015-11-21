// External dependencies
import React from 'react';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import Post from './single';

/**
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: PostsStore.getPosts()
	};
}

let PostList = React.createClass( {
	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
		API.getPosts( AnadamaSettings.URL.root + '/posts/' );
		PostsStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	render: function() {
		var posts = this.state.data.map( function( post, i ) {
			return <Post key={ 'post-' + i } { ...post } />
		} );

		return (
			<div>{ posts }</div>
		);
	}
} );

export default PostList;
