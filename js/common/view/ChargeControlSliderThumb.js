// Copyright 2018, University of Colorado Boulder

/**
 * Custom slider thumb that changes its background color based on the value of its associated object Property value.
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
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var SliderThumb = require( 'SUN/SliderThumb' );

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
    // REVIEW: Doc type
    var fillEnabledProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return self.getUpdatedFill( value );
    } );

    // REVIEW: Doc type
    var fillHighlightedProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return self.getUpdatedFill( value ).colorUtilsBrighter( 0.25 );
    } );

    options = _.extend( {
      // REVIEW: Consider using BooleanProperty?
      enabledProperty: new Property( true ),
      size: THUMB_SIZE,
      fillEnabled: fillEnabledProperty,
      fillHighlighted: fillHighlightedProperty
    }, options );

    // @private - whether the slider thumb is enabled
    // REVIEW: Doc type?
    this.enabledProperty = options.enabledProperty;
    
    SliderThumb.call( this, this.enabledProperty, options );
  }

  coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );

  return inherit( SliderThumb, ChargeControlSliderThumb, {

    //REVIEW: Can this be declared locally within the constructor. This method is only used in this file
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