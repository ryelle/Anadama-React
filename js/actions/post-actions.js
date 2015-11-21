import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  posts
	 */
	preFetch: function( posts ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POSTS,
			data: posts
		} );
	},

	/**
	 * @param  {array}  posts
	 */
	fetch: function( posts ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POSTS_SUCCESS,
			data: posts
		} );
	},
}
