Anadama
=======

A react-based recipe theme for WordPress.

Want to try out the theme? Download or clone this repo into your `/themes` folder, then run a few npm scripts to install and build the javascript & CSS files. The process will look like this

	git clone https://github.com/ryelle/Anadama-React anadama
	cd anadama
	npm install
	npm run dev

Now you'll see a `js/app.js` file in the theme, and it will be available for you to switch to in wp-admin. If you're having trouble getting the theme active, please [file an issue](https://github.com/ryelle/Anadama-React/issues) & I'll help you out.

_If you don't have npm or gulp installed, you can find instructions on their websites: [gulp](http://gulpjs.com/), [npm](http://npmjs.com)._

Setup
-----

Since this is a more "experimental" theme, you'll need to have a few things set up before it'll work.

1. You'll need the [WP REST API plugin version 2.0-beta13](https://wordpress.org/plugins/rest-api/). WP 4.4+ has the framework for the REST API, but the actual content of it still requires the plugin.
2. You'll also need this [WP-API Menus plugin](https://wordpress.org/plugins/wp-api-menus/). The REST API doesn't provide an endpoint for menus, so another plugin is necessary.
3. Your permalinks will need to be set to `/%year%/%monthnum%/%postname%/`. Single-post/page views will not work without permalinks set.

Display & Features
------------------

The front page of this theme displays 10 categories (ordered by term ID, which corresponds to date created) and the 20 most recent posts in each category. It uses localStorage to hold posts for offline/faster response time.

This theme has **no** sidebars, widgets, or comments.

Known Issues/To Do
------------------

 - Sites that have no content won't appear to load, the loading message stays on-screen even after an empty server response.
 - Menu items have conditional classes in place, but they're not automatically applied (current page, parent, etc)
 - Work with Jetpack scripts to load (or not) when needed.
 - Make the recipe's "Print" button work (related to Jetpack scripts)
 - Responsive styles + a good print stylesheet for recipe pages
 - Cached data will stick around forever, maybe not the best idea for post list pages.
 - Category/Tag archives don't exist yet

Building the Javascript & CSS
-----------------------------

Currently this project uses gulp to build a CSS file from `sass/style.scss`, and webpack by way of gulp to build the javascript file from `js/index.js`. There are 3 ways to build (the CSS is done the same in all 3, no minification there currently):

### `npm run dev`

This builds a development version of app.js, along with a sourcemap.

### `npm run watch`

This builds the development version, then watches the Sass and JS files for any changes to automatically re-build.

### `npm run build`

This builds the "production" version of the code, and is only here as an example of how to set up a production build. I don't recommend running Anadama as it is in production without your own testing (browser, device, etc).
