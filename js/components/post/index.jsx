// External dependencies
import React from 'react';
import page from 'page';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import ContentMixin from 'utils/content-mixin';
import PostsStore from '../../stores/posts-store';

/**
 * Method to retrieve state from Stores
 */
function getState( id ) {
	return {
		data: PostsStore.getPost( id )
	};
}

let SinglePost = React.createClass( {
	mixins: [ ContentMixin ],

	getInitialState: function() {
		return getState( this.props.id );
	},

	componentDidMount: function() {
		API.getPost( '/posts/' + this.props.id );
		PostsStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.id ) );
	},

	close: function( event ) {
		page( '/' );
	},

	renderPlaceholder: function() {
		return null;
	},

	render: function() {
		let post = this.state.data;
		if ( 'undefined' === typeof post.title ) {
			return this.renderPlaceholder();
		}

		let classes = classNames( {
			'entry': true
		} );

		return (
			<div className="card">
				<article id={ `post-${ post.id }` } className={ classes }>
					<a className="card-x close-card" onClick={ this.close }>&lt; Back</a>
					<h2 className="entry-title" dangerouslySetInnerHTML={ this.getTitle( post ) } />
					<div className="entry-content" dangerouslySetInnerHTML={ this.getContent( post ) } />
				</article>
			</div>
		);
	}
} );

export default SinglePost;
