/* global jQuery */
import first from 'lodash/array/first';

/**
 * Internal dependencies
 */
import PostActions from '../actions/post-actions';
import NavActions from '../actions/nav-actions';

var _noop = function() {};

var _get = function( url, data ) {
	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json',
	} );
};

export default {

	// Get /posts/, then for each post, get the categories.
	getPosts: function( path, args ) {
		let url = AnadamaSettings.URL.root + path;

		jQuery.when(
			_get( url, args )
		).done( function( data ) {
			let requests = [];
			data.map( function( post, i ) {
				requests.push( _get( AnadamaSettings.URL.root + '/posts/' + post.id + '/terms/category', {} ) );
			} );
			jQuery.when( ...requests ).done( function( ...results ) {
				results.map( function( result, i ) {
					if ( 'success' !== result[1] ) {
						data[i].categories = [];
						return;
					}
					data[i].categories = result[0];
				} );

				PostActions.fetch( data );
			} );
		} );
	},

	// Get /posts/:id
	getPost: function( slug, type ) {
		let url = `${AnadamaSettings.URL.root}/${type}s/?filter[name]=${slug}`;

		jQuery.when(
			_get( url, {} )
		).done( function( data ) {
			if ( data.constructor === Array ) {
				data = first( data );
			}
			PostActions.fetchSingle( data );
		} );
	},

	// Get /wp-api-menus/v2/menu-locations/:location
	getMenu: function( path ) {
		let url = AnadamaSettings.URL.menuRoot + path;

		jQuery.when(
			_get( url, {} )
		).done( function( data ) {
			NavActions.fetch( data );
		} ).fail( function( request, status, message ) {
			NavActions.fetchFailed( message, request );
		} );
	}
};
