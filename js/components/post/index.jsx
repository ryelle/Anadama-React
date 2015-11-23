// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import ContentMixin from 'utils/content-mixin';

let SinglePost = React.createClass( {
	mixins: [ ContentMixin ],

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
