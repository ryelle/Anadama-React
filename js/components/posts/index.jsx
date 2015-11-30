// External dependencies
import React from 'react';
import filter from 'lodash/collection/filter';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import Post from './single';
import SearchForm from '../search';
import Pagination from '../pagination';

/**
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: PostsStore.getPostsByCategory(),
		paginationLimit: PostsStore.getPaginationLimit(),
		filter: '',
	};
}

let PostList = React.createClass( {

	propTypes: {
		page: React.PropTypes.number.isRequired,
	},

	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
		API.getPosts( { page: this.props.page } );
		PostsStore.addChangeListener( this._onChange );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			API.getPosts( { page: this.props.page } );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	setTitle: function() {
		document.title = AnadamaSettings.title;
	},

	search: function( event ) {
		let term = this.refs.searchForm.getValue();
		this.setState( {
			filter: term,
		} );
	},

	getPosts: function() {
		if ( ! this.state.filter || ( this.state.filter.length < 3 ) ) {
			return this.state.data;
		}
		return filter( this.state.data, ( post, i ) => {
			if ( 'undefined' === typeof post.title ) {
				return false;
			}
			let title = post.title.rendered.toLowerCase();
			let search = this.state.filter.toLowerCase();
			return ( -1 !== title.indexOf( search ) );
		} );
	},

	renderPlaceholder: function() {
		if ( this.state.filter.length > 0 ) {
			return (
				<div className="placeholder">No results found for &ldquo;{ this.state.filter }&rdquo;</div>
			);
		}
		return (
			<div className="placeholder">Deliciousness is loading…</div>
		);
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
		let categories = this.state.data; // { $slug: { name: 'Cake', posts: [ Object, Object ] }, $slug: ... }
		let posts = [];

		this.setTitle();

		for ( let cat of categories ) {
			posts.push(
				<div className='post-list' key={ cat.slug }>
					<h1 className='section-title'>{ cat.name }</h1>
					{ this.renderPosts( cat.posts ) }
				</div>
			);
		};

		return (
			<div className="site-content">
				<SearchForm ref='searchForm' onChange={ this.search } />
				{ posts.length ?
					posts :
					this.renderPlaceholder()
				}
				<Pagination current={ this.props.page } end={ this.state.paginationLimit } />
			</div>
		);
	}
} );

export default PostList;
