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

var _get = function( url, callback ) {
	jQuery.ajax( {
		url: url,
		dataType: 'json',
		success: ( data ) => {
			if ( data.constructor !== Array ) {
				data = [ data ];
			}
			callback( data );
		},
		error: ( xhr, status, err ) => {
			console.error( url, status, err.toString() );
		}
	} );
};

var _post = function( url, data, callback ) {
	jQuery.ajax( {
		url: url,
		type: 'post',
		data: data,
		dataType: 'json',
		beforeSend: function( xhr, settings ) {
			xhr.setRequestHeader( 'X-WP-Nonce', AnadamaSettings.nonce );
		},
		success: ( data ) => {
			callback( data );
		},
		error: ( xhr, status, err ) => {
			console.error( url, status, err.toString() );
		}
	} );
};

export default {
	getPosts: function( url ) {
		PostActions.preFetch( [] );
		_get( url, PostActions.fetch );
	},
};
