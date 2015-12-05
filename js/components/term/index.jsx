// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import PostList from '../posts/list';
import Pagination from '../pagination';

/**
 * Method to retrieve state from Stores
 */
function getState( term ) {
	return {
		data: PostsStore.getTerm( term )
	};
}

let Term = React.createClass( {

	propTypes: {
		page: React.PropTypes.number.isRequired,
		term: React.PropTypes.string.isRequired,
		taxonomy: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return getState( this.props.term );
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );
		API.getTerm( this.props );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			API.getTerm( this.props );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.term ) );
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		let category = this.state.data;
		if ( 'undefined' === typeof category.name ) {
			return this.renderEmpty();
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">{ category.name }</h1>
					{ category.description.length > 0 ?
						<div className="taxonomy-description">{ category.description }</div>:
						null
					}
				</header>
				<PostList posts={ [] } />
			</div>
		);
	}
} );

export default Term;
