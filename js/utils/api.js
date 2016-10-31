/* global jQuery AnadamaSettings */
import first from 'lodash/first';

/**
 * Internal dependencies
 */
import PostActions from '../actions/post-actions';
import TermActions from '../actions/term-actions';
import NavActions from '../actions/nav-actions';

const _get = function( url, data ) {
	const cacheKey = url.replace( AnadamaSettings.URL.root, '' ) + JSON.stringify( data );
	let postData = JSON.parse( localStorage.getItem( cacheKey ) );
	if ( postData && AnadamaSettings.localStorageCache ) {
		let dfd = new jQuery.Deferred;
		return dfd.resolve( postData );
	}

	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json',
		success: ( returnData ) => {
			if ( AnadamaSettings.localStorageCache ) {
				localStorage.setItem( cacheKey, JSON.stringify( returnData ) );
			}
		}
	} );
};

const _getPagination = function( url, data, request ) {
	const cacheKey = url.replace( AnadamaSettings.URL.root, '' ) + JSON.stringify( data ) + '-pages';
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
		const url = AnadamaSettings.URL.api + '/categories/';
		// args.hide_empty = true; // disabled until the API fixes boolean params
		args.per_page = 10;

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			_getPagination( url, data, request ); // Set the page limit in PostsStore
			const requests = [];
			data.map( function( category ) {
				requests.push( _get(
					AnadamaSettings.URL.api + '/posts/',
					{
						per_page: 20,
						filter: {
							category_name: category.slug
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
						data[ i ].posts = result[ 0 ];
					} else if ( 'string' === typeof result[1] ) {
						// Unsuccessful response from API
						data[ i ].posts = [];
					} else {
						// Pulled data from localStorage
						data[ i ].posts = result;
					}
				} );

				PostActions.fetch( data );
			} );
		} );
	},

	// Get posts in a category
	getPostsInTerm: function( filter = {} ) {
		const url = AnadamaSettings.URL.api + '/posts/';
		const args = {
			filter: filter,
			per_page: 20,
		};

		jQuery.when(
			_get( url, args )
		).done( function( data ) {
			// Fetch expects an array of arrays, thanks to the category setup above.
			PostActions.fetch( [ { posts: data } ] );
		} );
	},

	// args: term, taxonomy
	getTerm: function( args ) {
		const url = `${AnadamaSettings.URL.api}/${args.taxonomy}/`;
		args = {
			search: args.term
		};

		jQuery.when(
			_get( url, args )
		).done( function( data ) {
			if ( data.constructor === Array ) {
				data = first( data );
			}
			TermActions.fetch( data );
		} );
	},

	// Get /{post_type}/?filter[name]={slug}
	getPost: function( slug, type ) {
		const url = `${AnadamaSettings.URL.api}/${type}s/?filter[name]=${slug}`;

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
		const url = AnadamaSettings.URL.menuApi + path;

		jQuery.when(
			_get( url, {} )
		).done( function( data ) {
			NavActions.fetch( data );
		} ).fail( function( request, status, message ) {
			NavActions.fetchFailed( message, request );
		} );
	},
};
