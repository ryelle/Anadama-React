/* eslint-disable no-multi-spaces */
/*global AnadamaSettings */
/**
 * Entry point for the app.
 * `page` is used to trigger the right controller for a route.
 * The controller renders the top-level component for a given page.
 */

// Load in the babel (es6) polyfill
require( 'babel-polyfill' );

// External dependencies
import page from 'page';

import API from 'utils/api';

// Internal dependencies
import Controller from './components/controller';

const path = AnadamaSettings.path || '/';
page.base( path );

page( '',               Controller.setup, Controller.navigation, Controller.posts );
page( 'page/:page',     Controller.setup, Controller.navigation, Controller.posts );
page( 'category/:term', Controller.setup, Controller.navigation, Controller.term );
page( 'tag/:term',      Controller.setup, Controller.navigation, Controller.term );

page( /^(?!wp-admin).*/, Controller.setup, Controller.navigation, Controller.post );

document.addEventListener( 'DOMContentLoaded', function() {
	page.start();
} );

module.exports = {
	page: page,
	api: API,
};
