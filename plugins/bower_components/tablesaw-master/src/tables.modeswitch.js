/*
* tablesaw: A set of plugins for responsive tables
* Mode Switch: UI element to allow the user to change table modes: stack/swipe/columntoggle
* Copyright (c) 2013 Filament Group, Inc.
* MIT License
*/

;(function( win, $ ) {

	var S = {
		selectors: {
			init: 'table[data-tablesaw-mode-switch]'
		***REMOVED***,
		attributes: {
			excludeMode: 'data-tablesaw-mode-exclude'
		***REMOVED***,
		classes: {
			main: 'tablesaw-modeswitch',
			toolbar: 'tablesaw-toolbar'
		***REMOVED***,
		modes: [ 'stack', 'swipe', 'columntoggle' ],
		init: function( table ) {
			var $table = $( table ),
				ignoreMode = $table.attr( S.attributes.excludeMode ),
				$toolbar = $table.prev().filter( '.tablesaw-bar' ),
				modeVal = '',
				$switcher = $( '<div>' ).addClass( S.classes.main + ' ' + S.classes.toolbar ).html(function() {
					var html = [ '<label>' + Tablesaw.i18n.columns + ':' ],
						dataMode = $table.attr( 'data-tablesaw-mode' ),
						isSelected;

					html.push( '<span class="btn btn-small">&#160;<select>' );
					for( var j=0, k = S.modes.length; j<k; j++ ) {
						if( ignoreMode && ignoreMode.toLowerCase() === S.modes[ j ] ) {
							continue;
						***REMOVED***

						isSelected = dataMode === S.modes[ j ];

						if( isSelected ) {
							modeVal = S.modes[ j ];
						***REMOVED***

						html.push( '<option' +
							( isSelected ? ' selected' : '' ) +
							' value="' + S.modes[ j ] + '">' + Tablesaw.i18n.modes[ j ] + '</option>' );
					***REMOVED***
					html.push( '</select></span></label>' );

					return html.join('');
				***REMOVED***);

			var $otherToolbarItems = $toolbar.find( '.tablesaw-advance' ).eq( 0 );
			if( $otherToolbarItems.length ) {
				$switcher.insertBefore( $otherToolbarItems );
			***REMOVED*** else {
				$switcher.appendTo( $toolbar );
			***REMOVED***

			$switcher.find( '.btn' ).tablesawbtn();
			$switcher.find( 'select' ).bind( 'change', S.onModeChange );
		***REMOVED***,
		onModeChange: function() {
			var $t = $( this ),
				$switcher = $t.closest( '.' + S.classes.main ),
				$table = $t.closest( '.tablesaw-bar' ).nextUntil( $table ).eq( 0 ),
				val = $t.val();

			$switcher.remove();
			$table.data( 'table' ).destroy();

			$table.attr( 'data-tablesaw-mode', val );
			$table.table();
		***REMOVED***
	***REMOVED***;

	$( win.document ).on( "tablesawcreate", function( e, Tablesaw ) {
		if( Tablesaw.$table.is( S.selectors.init ) ) {
			S.init( Tablesaw.table );
		***REMOVED***
	***REMOVED***);

***REMOVED***)( this, jQuery );