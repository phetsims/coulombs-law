// Copyright 2017-2019, University of Colorado Boulder

/**
 * Custom slider thumb that changes its background color based on the value of its associated object Property value.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SliderThumb = require( 'SUN/SliderThumb' );

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

    // {Property.<Color>}
    // fills are axon Properties because they need to change with the objectProperty
    // Since sliders are never disposed in the sim, there's no need to unlink the derived properties' functions
    var fillProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return getUpdatedFill( value );
    } );

    // {Property.<Color>}
    var fillHighlightedProperty = new DerivedProperty( [ objectProperty ], function( value ) {
      return getUpdatedFill( value ).colorUtilsBrighter( 0.25 );
    } );

    options = _.extend( {
      size: THUMB_SIZE,
      fill: fillProperty,
      fillHighlighted: fillHighlightedProperty
    }, options );

    SliderThumb.call( this, options );

    this.mouseArea = this.localBounds;
    this.touchArea = this.mouseArea.dilated( 6 );
  }

  /**
   * Helper function to get a color based on a linked Property's value
   *
   * @param {number} propertyValue
   * @returns {Color}
   */
  function getUpdatedFill( propertyValue ) {

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

  coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );

  return inherit( SliderThumb, ChargeControlSliderThumb );
} );