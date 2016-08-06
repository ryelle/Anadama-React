// External dependencies
import React from 'react';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import TermStore from '../../stores/term-store';
import PostList from '../posts/list';
// import Pagination from '../pagination';

/**
 * Method to retrieve state from Stores
 *
 * @param {string} term - Currently-displaying term
 * @return {object} - Current term and post listing
 */
function getState( term ) {
	return {
		data: TermStore.getTerm( term ),
		posts: PostsStore.getPosts(),
	};
}

const Term = React.createClass( {
	propTypes: {
		page: React.PropTypes.number.isRequired,
		term: React.PropTypes.string.isRequired,
		taxonomy: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return getState( this.props.term );
	},

	componentDidMount: function() {
		const filter = {};
		if ( 'categories' === this.props.taxonomy ) {
			filter.category_name = this.props.term;
		} else {
			filter.tag = this.props.term;
		}

		TermStore.addChangeListener( this._onChange );
		PostsStore.addChangeListener( this._onChange );

		API.getTerm( this.props );
		API.getPostsInTerm( filter );
	},

	componentDidUpdate: function( prevProps ) {
		if ( prevProps !== this.props ) {
			const filter = {};
			if ( 'categories' === this.props.taxonomy ) {
				filter.category_name = this.props.term;
			} else {
				filter.tag = this.props.term;
			}
			API.getTerm( this.props );
			API.getPostsInTerm( filter );
		}
	},

	componentWillUnmount: function() {
		TermStore.removeChangeListener( this._onChange );
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.term ) );
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		const category = this.state.data;
		if ( 'undefined' === typeof category.name ) {
			return this.renderEmpty();
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">{ category.name }</h1>
					{ category.description.length > 0 ?
						<div className="taxonomy-description">{ category.description }</div> :
						null
					}
				</header>
				<div className="post-list">
					<PostList posts={ this.state.posts } />
				</div>
			</div>
		);
	}
} );

export default Term;
