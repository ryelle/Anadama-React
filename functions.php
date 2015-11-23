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
	wp_enqueue_style( 'anadama-style', get_stylesheet_uri() );
	wp_enqueue_script( 'anadama-react', get_template_directory_uri() . '/js/app.js', array( 'jquery' ), ANADAMA_VERSION, true );

	wp_localize_script( 'anadama-react', 'AnadamaSettings', array(
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'user' => get_current_user_id(),
		'URL' => array(
			'root' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
			'base' => esc_url_raw( home_url() ),
			'theme' => esc_url_raw( get_template_directory_uri() ),
		),
	) );
}
add_action( 'wp_enqueue_scripts', 'anadama_scripts' );
