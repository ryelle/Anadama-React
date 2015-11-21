// External dependencies
import React from 'react';
import classNames from 'classnames';

let Post = React.createClass( {
	getTitle: function() {
		return { __html: this.props.title.rendered };
	},

	getContent: function() {
		return { __html: this.props.excerpt.rendered };
	},

	render: function() {
		let post = this.props;

		let classes = classNames( {
			'entry': true
		} );

		console.log( post );

		return (
			<div className={ classes }>
				<h1 className='entry-title' dangerouslySetInnerHTML={ this.getTitle() } />
				<div className='entry-content' dangerouslySetInnerHTML={ this.getContent() } />
			</div>
		);
	}
} );

export default Post;
