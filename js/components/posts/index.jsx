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
		API.getPosts( '/posts/', { 'per_page': 20 } );
		PostsStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	renderPosts: function( posts ) {
		posts = posts.map( function( post, i ) {
			return <Post key={ 'post-' + i } { ...post } />
		} );

		return (
			<ol className="site-main">
				{ posts }
			</ol>
		);
	},

	render: function() {
		let categories = {}; // { $slug: { name: 'Cake', posts: [ Object, Object ] }, $slug: ... }
		let posts = [];

		for ( let post of this.state.data ) {
			if ( 'undefined' === typeof post.categories ) {
				continue;
			}
			for ( let cat of post.categories ) {
				if ( 'undefined' === typeof categories[ cat.slug ] ) {
					categories[ cat.slug ] = {
						name: cat.name,
						posts: [ post ],
					};
				} else {
					categories[ cat.slug ].posts.push( post );
				}
			}
		}

		// Sort categories by name
		let slugs = Object.keys( categories );
		slugs.sort();

		for ( let slug of slugs ) {
			let cat = categories[ slug ];
			posts.push(
				<div className='post-list' key={ slug }>
					<h1 className='section-title'>{ cat.name }</h1>
					{ this.renderPosts( cat.posts ) }
				</div>
			);
		};

		return (
			<div className="site-content">
				{ posts }
			</div>
		);
	}
} );

export default PostList;
