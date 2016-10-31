/* global Anadama */
( function( $, api ) {

	// Site title.
	api( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );

	// Site tagline.
	api( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	/**
	 * Override the handler for clicking links in preview to allow history.pushState() to do its thing.
	 *
	 * @param {jQuery.Event} event Event.
	 */
	api.Preview.prototype.handleLinkClick = function handleLinkClick( event ) {
		var link, isInternalJumpLink;
		link = $( event.target );

		// No-op if the anchor is not a link.
		if ( _.isUndefined( link.attr( 'href' ) ) ) {
			return;
		}

		isInternalJumpLink = ( '#' === link.attr( 'href' ).substr( 0, 1 ) );

		// Allow internal jump links to behave normally without preventing default.
		if ( isInternalJumpLink ) {
			return;
		}

		// If the link is not previewable, prevent the browser from navigating to it.
		if ( ! api.isLinkPreviewable( link[0] ) ) {
			wp.a11y.speak( api.settings.l10n.linkUnpreviewable );
			event.preventDefault();
		}
	};

	// Override default behavior with no-op.
	api.navMenusPreview.onChangeNavMenuLocationsSetting = function() {};

	api( 'nav_menu_locations[primary]', function previewNavMenuUpdates( navMenuLocationSetting ) {
		var assignedNavMenuId = navMenuLocationSetting.get(), refreshNavMenu, requestNavMenu;

		refreshNavMenu = function() {
			$( '#site-navigation' ).addClass( 'customize-partial-refreshing' );
			requestNavMenu();
		};

		requestNavMenu = _.debounce( function() {
			Anadama.api.getMenu( '/menu-locations/primary/' ).done( function() {
				$( '#site-navigation' ).removeClass( 'customize-partial-refreshing' );
			} );
		}, api.settings.timeouts.selectiveRefresh );

		navMenuLocationSetting.bind( function( menuId ) {
			assignedNavMenuId = menuId;
			refreshNavMenu();
		} );

		api.navMenusPreview.onChangeNavMenuSetting = function() {
			var navMenuSetting = this;
			if ( 'nav_menu[' + String( assignedNavMenuId ) + ']' === navMenuSetting.id ) {
				refreshNavMenu();
			}
		};
		api.navMenusPreview.onChangeNavMenuItemSetting = function( newItem, oldItem ) {
			if ( newItem && assignedNavMenuId === newItem.nav_menu_term_id || ! newItem && assignedNavMenuId === oldItem.nav_menu_term_id ) {
				refreshNavMenu();
			}
		};
	} );

} )( jQuery, wp.customize );
