// Copyright 2017-2022, University of Colorado Boulder

/**
 * Model for one of the spherical draggable charges.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ISLCObject from '../../../../inverse-square-law-common/js/model/ISLCObject.js';
import merge from '../../../../phet-core/js/merge.js';
import { Color } from '../../../../scenery/js/imports.js';
import coulombsLaw from '../../coulombsLaw.js';

class Charge extends ISLCObject {

  /**
   * @param {number} initialCharge
   * @param {number} initialPosition - only for the x coordinate
   * @param {Range} valueRange - only for the x coordinate
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( initialCharge, initialPosition, valueRange, tandem, options ) {

    options = merge( {
      constantRadius: 6.75E-3, // ensure this is in meters (0.675cm)
      valueUnits: 'C' // coulombs, from units.js
    }, options );

    const constantRadiusProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'constantRadiusProperty' )
    } );

    const negativeColor = new Color( '#00f' );
    const positiveColor = new Color( '#f00' );

    super( initialCharge, initialPosition, valueRange, constantRadiusProperty,
      () => this.radiusProperty.get(), tandem, options );

    // see ISLCObject
    this.baseColorProperty = new DerivedProperty( [ this.valueProperty ], value => {
        const newBaseColor = value < 0 ? negativeColor : positiveColor;
        return newBaseColor.colorUtilsBrighter( 1 - Math.abs( value ) / valueRange.max );
      },
      { tandem: tandem.createTandem( 'baseColorProperty' ), phetioValueType: Color.ColorIO }
    );
  }
}

coulombsLaw.register( 'Charge', Charge );
export default Charge;