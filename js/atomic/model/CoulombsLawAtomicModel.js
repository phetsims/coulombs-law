// Copyright 2017-2019, University of Colorado Boulder

/**
 * Model for Atomic Scale screen.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const Charge = require( 'COULOMBS_LAW/common/model/Charge' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawCommonModel = require( 'COULOMBS_LAW/common/model/CoulombsLawCommonModel' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Range = require( 'DOT/Range' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawAtomicModel( tandem ) {

    // conversion factor for atomic units
    const e = ISLCConstants.coulombsPerAtomicUnit;

    // set initial charge values
    const chargeValue1 = -2 * e; // charge in Coulombs
    const chargeValue2 = 4 * e; // charge in Coulombs

    const position1 = -2E-11; // initial position from center in m (20pm)
    const position2 = 2E-11; // initial position from center in m (20pm)

    const minChargeValue = -10 * e; // in Coulombs
    const maxChargeValue = 10 * e; // in Coulombs

    const valueRange = new Range( minChargeValue, maxChargeValue );
    const constantRadius = 9.5E-13;

    const charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ), {
      constantRadius: constantRadius
    } );
    const charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ), {
      constantRadius: constantRadius
    } );

    // boundary constants are in "X meters", convert to "X pm" (-50pm, 50pm) but still in the unit of meters
    const leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-11;
    const rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-11;

    // @public - the position of the ruler in the model
    this.rulerPositionProperty = new Vector2Property( new Vector2( 0, -0.75E-11 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' )
    } );

    CoulombsLawCommonModel.call( this, charge1, charge2, new Range( leftBoundary, rightBoundary ), tandem, {
      minSeparationBetweenObjects: 1E-13,
      snapObjectsToNearest: 1E-12
    } );
  }

  coulombsLaw.register( 'CoulombsLawAtomicModel', CoulombsLawAtomicModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawAtomicModel );
} );