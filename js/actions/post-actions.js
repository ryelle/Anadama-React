import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  posts
	 */
	fetch: function( posts ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POSTS_SUCCESS,
			data: posts
		} );
	},

	/**
	 * @param  {array}  posts
	 */
	fetchSingle: function( post ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POST_SUCCESS,
			id: post.id,
			data: post
		} );
	},
}
