/* global jQuery */
import first from 'lodash/array/first';

/**
 * Internal dependencies
 */
import PostActions from '../actions/post-actions';
import TermActions from '../actions/term-actions';
import NavActions from '../actions/nav-actions';

var _noop = function() {};

var _get = function( url, data ) {
	let cacheKey = url.replace( AnadamaSettings.URL.base, '' ) + JSON.stringify( data );
	let postData = JSON.parse( localStorage.getItem( cacheKey ) );
	if ( postData ) {
		let dfd = jQuery.Deferred();
		return dfd.resolve( postData );
	}

	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json',
		success: ( data ) => {
			localStorage.setItem( cacheKey, JSON.stringify( data ) );
		}
	} );
};

var _getPagination = function( url, data, request ) {
	let cacheKey = url.replace( AnadamaSettings.URL.base, '' ) + JSON.stringify( data ) + '-pages';
	if ( 'undefined' !== typeof request ) {
		PostActions.fetchPaginationLimit( request.getResponseHeader( 'X-WP-TotalPages' ) );
		localStorage.setItem( cacheKey, request.getResponseHeader( 'X-WP-TotalPages' ) );
	} else {
		PostActions.fetchPaginationLimit( localStorage.getItem( cacheKey ) );
	}
};

export default {

	// Get some categories, then for each category, get a few posts.
	// args: might have pagination.
	getPosts: function( args ) {
		let url = AnadamaSettings.URL.root + '/terms/category/';
		args.hide_empty = true
		args.per_page = 10;

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			_getPagination( url, data, request ); // Set the page limit in PostsStore
			let requests = [];
			data.map( function( category, i ) {
				requests.push( _get(
					AnadamaSettings.URL.root + '/posts/',
					{
						'per_page': 20,
						'filter': {
							'category_name': category.slug
						}
					}
				) );
			} );
			jQuery.when( ...requests ).done( function( ...results ) {
				// If `results` is just one request's results, make sure it's the expected format.
				if ( 'string' === typeof results[1] ) {
					results = [ results ];
				}
				results.map( function( result, i ) {
					if ( 'success' === result[1] ) {
						// Successful response from API
						data[i].posts = result[0];
					} else if ( 'string' === typeof result[1] ) {
						// Unsuccessful response from API
						data[i].posts = [];
					} else {
						// Pulled data from localStorage
						data[i].posts = result;
					}
				} );

				PostActions.fetch( data );
			} );
		} );
	},

	// Get posts in a category
	// args: term, taxonomy
	getTerm: function( args ) {
		let url = `${AnadamaSettings.URL.root}/terms/${args.taxonomy}/`;
		args = {
			search: args.term
		};

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			if ( data.constructor === Array ) {
				data = first( data );
			}
			TermActions.fetch( data );
		} );
	},

	// Get /{post_type}/?filter[name]={slug}
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
	},
};
