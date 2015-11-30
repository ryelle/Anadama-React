Anadama
=======

A react-based recipe theme for WordPress.

Want to try out the theme? Download or clone this repo into your `/themes` folder, then run npm & gulp to install and build the javascript & CSS files. The process will look like this

	git clone https://github.com/ryelle/Anadama-React anadama
	cd anadama
	npm install
	gulp

Now you'll see a `js/app.js` file in the theme, and it will be available for you to switch to in wp-admin.

Setup
-----

Since this is a more "experimental" theme, you'll need to have a few things set up before it'll work.

1. You'll need the WP-API plugin. WP 4.4 has the framework for the REST API, but the actual content of it still requires the plugin.
2. You'll also need this WP-API Menus plugin. The REST API doesn't provide an endpoint for menus, so another plugin is necessary.
3. Your permalinks will need to be set to `/%year%/%monthnum%/%postname%/`. Single-post/page views will not work without permalinks set.

Display & Features
------------------

The front page of this theme displays 10 categories (ordered by term ID, which corresponds to date created) and the 20 most recent posts in each category.

This theme has no sidebars, widgets, or comments.

It uses (or will soon) Local Storage to hold posts for offline/faster response time.

Sites that have no content won't appear to load.
