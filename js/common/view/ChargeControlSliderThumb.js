// Copyright 2013-2017, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */

define( function( require ) {
  'use strict';

  // modules
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSliderThumb = require( 'SUN/HSliderThumb' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  // constants
  var THUMB_SIZE = new Dimension2( 10, 18 );
  var NEGATIVE_FILL = new Color( '#00f' );
  var POSITIVE_FILL = new Color( '#f00' );
  var ZERO_FILL = new Color( 'indigo' );

  function ChargeControlSliderThumb( objectProperty, options ) {

    var self = this;

    options = _.extend( {
      enabledProperty: new Property( true ),
      size: THUMB_SIZE
    }, options );

    this.enabledProperty = options.enabledProperty;
    
    HSliderThumb.call( this, this.enabledProperty, options );

    // remove default & duplicate button listeners
    for (var i = this.inputListeners.length - 1; i >= 0; i--) {
      if ( this.inputListeners[ i ] instanceof ButtonListener ) {
        this.removeInputListener( this.inputListeners[ i ] );
      }
    }

    // create & attach custom button listener to handle hover and up events
    // 
    this.addInputListener( new ButtonListener( {
      over: function( event ) {
        self.fill = self.baseThumbFill.colorUtilsBrighter( 0.25 );
      },
      up: function ( event ) {
        self.fill = self.baseThumbFill;
      }
    } ) );

    // link thumb fill to objectProperty value
    objectProperty.link( this.updateFill.bind( this ) );
  }

  coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );

  return inherit( HSliderThumb, ChargeControlSliderThumb, {
    /**
     * Set the thumb fill based on the linked property's value
     * @param  {int} propertyValue
     */
    updateFill: function( propertyValue ) {
      
      if ( propertyValue < 0 ) {
        this.baseThumbFill = NEGATIVE_FILL;
      } else if ( propertyValue > 0 ) {
        this.baseThumbFill = POSITIVE_FILL;
      } else {
        this.baseThumbFill = ZERO_FILL;
      }

      this.fill = this.baseThumbFill;
    }
  } );
} );