// Copyright 2017, University of Colorado Boulder

/**
 * Custom slider thumb that changes its backgroun color based on the value of its associated object property value.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */

define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSliderThumb = require( 'SUN/HSliderThumb' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  // constants
  var THUMB_SIZE = new Dimension2( 10, 18 );
  var NEGATIVE_FILL = new Color( '#00f' );
  var POSITIVE_FILL = new Color( '#f00' );
  var ZERO_FILL = new Color( 'gray' );

  /**
   * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
   * @param {Object} options
   * @constructor
   */
  function ChargeControlSliderThumb( objectProperty, options ) {

    var self = this;

    // fills are axon Properties because they need to change with the objectProperty
    // Since sliders are never disposed in the sim, there's no need to unlink the derived properties' functions
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

    // @private - whether the slider thumb is enabled
    this.enabledProperty = options.enabledProperty;
    
    HSliderThumb.call( this, this.enabledProperty, options );
  }

  coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );

  return inherit( HSliderThumb, ChargeControlSliderThumb, {

    /**
     * Set the thumb fill based on the linked property's value
     * 
     * @param {number} propertyValue
     * @returns {Color}
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