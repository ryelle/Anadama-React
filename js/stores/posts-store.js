import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

var CHANGE_EVENT = 'change';

/**
 * Our working post list, read-only
 * @type {array}
 * @protected
 */
var _posts = [];

/**
 * Load this array into our posts list
 *
 * @param {array} data - array of posts, pulled from API
 */
function _loadPosts( data ) {
	_posts = data;
}

let PostsStore = assign( {}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit( CHANGE_EVENT );
	},

	addChangeListener: function( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener: function( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	},

	/**
	 * Get the post list
	 *
	 * @returns {array}
	 */
	getPosts: function() {
		return _posts;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_POSTS_SUCCESS:
				_loadPosts( action.data );
				break;
		}

		PostsStore.emitChange();

		return true;
	} )

} );

export default PostsStore;
