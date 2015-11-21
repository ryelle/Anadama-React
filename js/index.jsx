/**
 * External dependencies
 */
// var page = require( 'page' );
var ReactDOM = require( 'react-dom' );
var React = require( 'react' );

console.log( "Starting React…" );

/**
 * Load in the babel (es6) polyfill
 */
require( 'babel-polyfill' );

let Test = React.createClass( {
	render: function() {
		return (
			<h1>Test</h1>
		);
	}
} );

ReactDOM.render(
	<Test />,
	document.getElementById( 'main' )
);
