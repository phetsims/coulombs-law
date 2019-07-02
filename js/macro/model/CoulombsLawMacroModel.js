// Copyright 2017-2018, University of Colorado Boulder

/**
 * Model for Macro Screen with large charge values.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var Charge = require( 'COULOMBS_LAW/common/model/Charge' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonModel = require( 'COULOMBS_LAW/common/model/CoulombsLawCommonModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroModel( tandem ) {

    // set initial charge values
    var chargeValue1 = -4E-6; // -4 microcoulombs in Coulombs
    var chargeValue2 = 8E-6; // 8 microcoulombs in Coulombs

    var position1 = -1E-2; // initial position from center in m
    var position2 = 2E-2; // initial position from center in m

    var minChargeValue = -10E-6; // in Coulombs
    var maxChargeValue = 10E-6; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    var charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ) );
    var charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ) );

    // boundary constants are in "X meters", convert to "X cm" but still in the unit of meters
    var leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-2;
    var rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-2;

    // @public - the ruler position
    this.rulerPositionProperty = new Vector2Property( new Vector2( 0, -7.5E-3 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' )
    } );

    CoulombsLawCommonModel.call( this, charge1, charge2, new Range( leftBoundary, rightBoundary ), tandem, {
      snapObjectsToNearest: 0.001,
      minSeparationBetweenObjects: 0.001,
      displayScientificNotation: false
    } );
  }

  coulombsLaw.register( 'CoulombsLawMacroModel', CoulombsLawMacroModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawMacroModel );
} );