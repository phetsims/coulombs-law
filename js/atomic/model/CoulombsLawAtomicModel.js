// Copyright 2017-2018, University of Colorado Boulder

/**
 * Model for Atomic Scale screen.
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
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawAtomicModel( tandem ) {

    // conversion factor for atomic units
    var e = ISLCConstants.coulombsPerAtomicUnit;

    // set initial charge values
    var chargeValue1 = -2 * e; // charge in Coulombs
    var chargeValue2 = 4 * e; // charge in Coulombs

    var position1 = -2E-11; // initial position from center in m (20pm)
    var position2 = 2E-11; // initial position from center in m (20pm)

    var minChargeValue = -10 * e; // in Coulombs
    var maxChargeValue = 10 * e; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );
    const constantRadius = 9.5E-13;

    var charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ), {
      constantRadius: constantRadius
    } );
    var charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ), {
      constantRadius: constantRadius
    } );

    // boundary constants are in "X meters", convert to "X pm" (-50pm, 50pm) but still in the unit of meters
    var leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-11;
    var rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-11;

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