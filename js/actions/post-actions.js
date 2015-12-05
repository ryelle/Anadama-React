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
	 * @param  {object}  term
	 */
	fetchTerm: function( term ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_TERM_SUCCESS,
			id: term.id,
			data: term
		} );
	},

	fetchPaginationLimit: function( total ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_PAGINATION_LIMIT,
			data: total
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
