// Copyright 2017-2021, University of Colorado Boulder

/**
 * Custom slider thumb that changes its background color based on the value of its associated object Property value.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import { Color } from '../../../../scenery/js/imports.js';
import SliderThumb from '../../../../sun/js/SliderThumb.js';
import coulombsLaw from '../../coulombsLaw.js';

// constants
const THUMB_SIZE = new Dimension2( 10, 18 );
const NEGATIVE_FILL = new Color( '#00f' );
const POSITIVE_FILL = new Color( '#f00' );
const ZERO_FILL = new Color( 'gray' );

class ChargeControlSliderThumb extends SliderThumb {

  /**
   * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
   * @param {Object} [options]
   */
  constructor( objectProperty, options ) {

    // {Property.<Color>}
    // fills are axon Properties because they need to change with the objectProperty
    // Since sliders are never disposed in the sim, there's no need to unlink the derived properties' functions
    const fillProperty = new DerivedProperty( [ objectProperty ], value => getUpdatedFill( value ) );

    // {Property.<Color>}
    const fillHighlightedProperty = new DerivedProperty( [ objectProperty ], value => getUpdatedFill( value ).colorUtilsBrighter( 0.25 ) );

    options = merge( {
      size: THUMB_SIZE,
      fill: fillProperty,
      fillHighlighted: fillHighlightedProperty
    }, options );

    super( options );

    this.mouseArea = this.localBounds;
    this.touchArea = this.mouseArea.dilated( 6 );
  }
}

/**
 * Helper function to get a color based on a linked Property's value
 *
 * @param {number} propertyValue
 * @returns {Color}
 */
function getUpdatedFill( propertyValue ) {

  let fill;
  if ( propertyValue < 0 ) {
    fill = NEGATIVE_FILL;
  }
  else if ( propertyValue > 0 ) {
    fill = POSITIVE_FILL;
  }
  else {
    fill = ZERO_FILL;
  }

  return fill;
}

coulombsLaw.register( 'ChargeControlSliderThumb', ChargeControlSliderThumb );
export default ChargeControlSliderThumb;