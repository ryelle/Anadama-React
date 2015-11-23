// External dependencies
import React from 'react';
import classNames from 'classnames';

let SinglePost = React.createClass( {
	render: function() {
		let classes = classNames( {
			'entry': true
		} );

		return (
			<li id={ "post-" + 0 } className={ classes }>
				<h2 className="entry-title">
					Post
				</h2>
			</li>
		);
	}
} );

export default SinglePost;
