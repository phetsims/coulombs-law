// Copyright 2017-2019, University of Colorado Boulder

/**
 * Model for one of the spherical draggable charges.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Color = require( 'SCENERY/util/Color' );
  const ColorIO = require( 'SCENERY/util/ColorIO' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const ISLCObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCObject' );

  class Charge extends ISLCObject {

    /**
     * @param {number} initialCharge
     * @param {number} initialPosition - only for the x coordinate
     * @param {Range} valueRange - only for the x coordinate
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( initialCharge, initialPosition, valueRange, tandem, options ) {

      options = _.extend( {
        constantRadius: 6.75E-3, // ensure this is in meters (0.675cm)
        valueUnits: 'coulombs'
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
        { tandem: tandem.createTandem( 'baseColorProperty' ), phetioType: DerivedPropertyIO( ColorIO ) }
      );
    }
  }

  return coulombsLaw.register( 'Charge', Charge );
} );