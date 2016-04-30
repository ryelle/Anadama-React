// External dependencies
import React from 'react';
import classNames from 'classnames';
import page from 'page';

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

	propTypes: {
		slug: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf( [ 'post', 'page' ] ),
	},

	getDefaultProps: function(){
		return {
			type: 'post',
		};
	},

	getInitialState: function() {
		return getState( this.props.slug );
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );
		API.getPost( this.props.slug, this.props.type );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			API.getPost( this.props.slug, this.props.type );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.slug ) );
	},

	setTitle: function() {
		let post = this.state.data;
		if ( 'undefined' !== typeof post.title ) {
			document.title = `${post.title.rendered} — ${AnadamaSettings.title}`;
		}
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

		this.setTitle();

		let classes = classNames( {
			'entry': true
		} );

		return (
			<div className="card">
				<article id={ `post-${ post.id }` } className={ classes }>
					<a className="card-x close-card" onClick={ this.close } style={ ( this.props.frontPage ) ? { display:'none' } : {} }>&lt; Back</a>
					<h2 className="entry-title" dangerouslySetInnerHTML={ this.getTitle( post ) } />
					<div className="entry-content" dangerouslySetInnerHTML={ this.getContent( post ) } />
				</article>
			</div>
		);
	}
} );

export default SinglePost;
