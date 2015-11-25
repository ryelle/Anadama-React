import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  menu
	 */
	fetch: function( menu ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_NAV_SUCCESS,
			data: menu
		} );
	},
}
