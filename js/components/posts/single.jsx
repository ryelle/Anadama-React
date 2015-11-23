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

		return (
			<li id={ "post-" + this.props.id } className={ classes }>
				<h2 className="entry-title">
					<a href={ `/archives/${ this.props.id }/` } rel="bookmark" dangerouslySetInnerHTML={ this.getTitle() } />
				</h2>
			</li>
		);
	}
} );

export default Post;
