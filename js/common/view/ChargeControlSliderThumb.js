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
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSliderThumb = require( 'SUN/HSliderThumb' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  // constants
  var THUMB_SIZE = new Dimension2( 10, 18 );
  var NEGATIVE_FILL = new Color( '#00f' );
  var POSITIVE_FILL = new Color( '#f00' );
  var ZERO_FILL = new Color( 'indigo' );

  /**
   * Constructor.
   * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
   * @param {Object} options
   */
  function ChargeControlSliderThumb( objectProperty, options ) {

    var self = this;

    // fills are axon Properties because they need to change with the objectProperty
    var fillEnabledProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return self.getUpdatedFill( value );
    } );

    var fillHighlightedProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return self.getUpdatedFill( value ).colorUtilsBrighter( 0.25 );
    } );

    options = _.extend( {
      enabledProperty: new Property( true ),
      size: THUMB_SIZE,
      fillEnabled: fillEnabledProperty,
      fillHighlighted: fillHighlightedProperty
    }, options );
    this.enabledProperty = options.enabledProperty;
    
    HSliderThumb.call( this, this.enabledProperty, options );
  }

  coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );

  return inherit( HSliderThumb, ChargeControlSliderThumb, {

    /**
     * Set the thumb fill based on the linked property's value
     * @param {number} propertyValue
     */
    getUpdatedFill: function( propertyValue ) {
      
      var fill;
      if ( propertyValue < 0 ) {
        fill = NEGATIVE_FILL;
      } else if ( propertyValue > 0 ) {
        fill = POSITIVE_FILL;
      } else {
        fill = ZERO_FILL;
      }

      return fill;
    }
  } );
} );