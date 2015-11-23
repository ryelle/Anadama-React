/* global jQuery */
/**
 * Internal dependencies
 */
import PostActions from '../actions/post-actions';
// import NavActions from '../actions/nav-actions';

/**
 * The API URL prefix
 * @type {string}
 * @protected
 */
var _URL = '';

var _noop = function() {};

var _get = function( path, data ) {
	let url = AnadamaSettings.URL.root + path;
	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json',
		error: ( xhr, status, err ) => {
			console.error( url, status, err.toString() );
		}
	} );
};

var _post = function( path, data ) {
	let url = AnadamaSettings.URL.root + path;
	return jQuery.ajax( {
		url: url,
		type: 'post',
		data: data,
		dataType: 'json',
		beforeSend: function( xhr, settings ) {
			xhr.setRequestHeader( 'X-WP-Nonce', AnadamaSettings.nonce );
		},
		error: ( xhr, status, err ) => {
			console.error( url, status, err.toString() );
		}
	} );
};

export default {

	// Get /posts/, then for each post, get the categories.
	getPosts: function( url, args ) {
		// PostActions.preFetch( [] );
		jQuery.when(
			_get( url, args )
		).done( function( data ) {
			let requests = [];
			data.map( function( post, i ) {
				requests.push( _get( '/posts/' + post.id + '/terms/category', {} ) );
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

};
