import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

var CHANGE_EVENT = 'change';

/**
 * Our working list of menu items, read-only
 * @type {array}
 * @protected
 */
var _menu = [];

/**
 * Load this array into our menu
 *
 * @param {array} data - array of menu items, pulled from API
 */
function _loadMenu( data ) {
	_menu = data;
}

let NavigationStore = assign( {}, EventEmitter.prototype, {
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
	 * Get the menu
	 *
	 * @returns {array}
	 */
	getMenu: function() {
		return _menu;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_NAV_SUCCESS:
				_loadMenu( action.data );
				break;
		}

		NavigationStore.emitChange();

		return true;
	} )

} );

export default NavigationStore;
