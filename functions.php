<?php
/**
 * Anadama functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Anadama
 */

if ( ! defined( 'ANADAMA_VERSION' ) ) {
	define( 'ANADAMA_VERSION', time() );
}

if ( ! function_exists( 'anadama_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function anadama_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Anadama, use a find and replace
	 * to change 'anadama' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'anadama', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'anadama' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	add_post_type_support( 'post', 'comments' );
	add_post_type_support( 'page', 'comments' );
}
endif; // anadama_setup
add_action( 'after_setup_theme', 'anadama_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function anadama_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'anadama_content_width', 730 );
}
add_action( 'after_setup_theme', 'anadama_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function anadama_scripts() {
	if ( is_customize_preview() ) {
		wp_enqueue_script( 'anadama-customize-preview', get_template_directory_uri() . '/js/customize-preview.js', array( 'jquery', 'customize-preview', 'customize-preview-nav-menus' ), ANADAMA_VERSION, true );
	}

	wp_enqueue_style( 'anadama-style', get_stylesheet_uri() );
	wp_enqueue_script( 'anadama-react', get_template_directory_uri() . '/js/app.js', array( 'jquery' ), ANADAMA_VERSION, true );

	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_scripts()->add_data( 'anadama-react', 'data', sprintf( 'var AnadamaSettings = %s;', wp_json_encode( array(
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'localStorageCache' => ! is_customize_preview(),
		'user' => get_current_user_id(),
		'title' => get_bloginfo( 'name', 'display' ),
		'path' => $path,
		'URL' => array(
			'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
			'menuApi' => esc_url_raw( get_rest_url( null, '/wp-api-menus/v2' ) ),
			'root' => esc_url_raw( $url ),
		),
	) ) ) );
}
add_action( 'wp_enqueue_scripts', 'anadama_scripts' );

/**
 * Returns the Google font stylesheet URL, if available.
 *
 * The use of Source Serif Pro and Source Code Pro by default is
 * localized. For languages that use characters not supported by
 * either font, the font can be disabled.
 *
 * @return string Font stylesheet or empty string if disabled.
 */
function anadama_fonts_url() {
	$fonts_url = '';

	/* Translators: If there are characters in your language that are not
	 * supported by Source Serif Pro, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$serifpro = _x( 'on', 'Source Serif Pro font: on or off', 'anadama' );

	/* Translators: If there are characters in your language that are not
	 * supported by Source Code Pro, translate this to 'off'. Do not translate into
	 * your own language.
	 */
	$codepro = _x( 'on', 'Source Code Pro font: on or off', 'anadama' );

	if ( 'off' !== $serifpro || 'off' !== $codepro ) {
		$font_families = array();

		if ( 'off' !== $serifpro )
			$font_families[] = urlencode( 'Source Serif Pro:400,700' );

		if ( 'off' !== $codepro )
			$font_families[] = urlencode( 'Source Code Pro:400,600' );

		$protocol = is_ssl() ? 'https' : 'http';
		$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		$fonts_url = add_query_arg( $query_args, "$protocol://fonts.googleapis.com/css" );
	}

	return $fonts_url;
}

/**
 * Loads our special font CSS file.
 *
 * To disable in a child theme, use wp_dequeue_style()
 * function mytheme_dequeue_fonts() {
 *     wp_dequeue_style( 'anadama-fonts' );
 * }
 * add_action( 'wp_enqueue_scripts', 'mytheme_dequeue_fonts', 11 );
 *
 * @return void
 */
function anadama_fonts() {
	$fonts_url = anadama_fonts_url();
	if ( ! empty( $fonts_url ) )
		wp_enqueue_style( 'anadama-fonts', esc_url_raw( $fonts_url ), array(), null );
}
add_action( 'wp_enqueue_scripts', 'anadama_fonts' );

/**
 * Add theme support for Jetpack Features
 */
function anadama_jetpack_setup() {
	add_theme_support( 'site-logo' );
}
add_action( 'after_setup_theme', 'anadama_jetpack_setup' );

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customize manager.
 */
function anadama_customize_register( WP_Customize_Manager $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	add_filter( 'wp_get_nav_menu_items', '_anadama_filter_wp_api_nav_menu_items_workaround', 20  );
}
add_action( 'customize_register', 'anadama_customize_register' );

/**
 * Workaround issue in WP API Menus plugin to force nav menu item classes to be arrays instead of strings.
 *
 * @see \WP_REST_Menus::get_menu_location()
 *
 * @param array $items Nav menu items.
 */
function _anadama_filter_wp_api_nav_menu_items_workaround( $items ) {
	foreach ( $items as &$item ) {
		if ( is_string( $item->classes ) ) {
			$item->classes = explode( ' ', $item->classes );
		}
	}
	return $items;
}
