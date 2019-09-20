// Copyright 2017-2019, University of Colorado Boulder

/**
 * Model for Macro Screen with large charge values.
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
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const Range = require( 'DOT/Range' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroModel( tandem ) {

    // set initial charge values
    const chargeValue1 = -4E-6; // -4 microcoulombs in Coulombs
    const chargeValue2 = 8E-6; // 8 microcoulombs in Coulombs

    const position1 = -1E-2; // initial position from center in m
    const position2 = 2E-2; // initial position from center in m

    const minChargeValue = -10E-6; // in Coulombs
    const maxChargeValue = 10E-6; // in Coulombs

    const valueRange = new Range( minChargeValue, maxChargeValue );

    const charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ) );
    const charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ) );

    // boundary constants are in "X meters", convert to "X cm" but still in the unit of meters
    const leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-2;
    const rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-2;

    CoulombsLawCommonModel.call( this, charge1, charge2, new Range( leftBoundary, rightBoundary ), tandem, {
      snapObjectsToNearest: 0.001,
      minSeparationBetweenObjects: 0.001,
      displayScientificNotation: false
    } );
  }

  coulombsLaw.register( 'CoulombsLawMacroModel', CoulombsLawMacroModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawMacroModel );
} );