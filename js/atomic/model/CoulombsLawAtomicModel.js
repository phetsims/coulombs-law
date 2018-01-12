// Copyright 2017, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2IO = require( 'DOT/Vector2IO' );

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
    // TODO: consider creating charges/masses in subtypes
    
    var chargeValue1 = 2 * e; // charge in Coulombs
    var chargeValue2 = -4 * e; // charge in Coulombs

    var position1 = -2E-11; // initial position from center in m (20pm)
    var position2 = 2E-11; // initial position from center in m (20pm)

    var minChargeValue = -10 * e; // in Coulombs
    var maxChargeValue = 10 * e; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    var charge1 = new Charge( chargeValue1, position1, valueRange, tandem, { 
      constantRadius: 9.5E-13,
      tandemUnits: 'coulombs'
    } );
    var charge2 = new Charge( chargeValue2, position2, valueRange, tandem, { 
      constantRadius: 9.5E-13,
      tandemUnits: 'coulombs'
    } );

    // boundary constants in m, convert to pm (-50pm, 50pm)
    var leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-11;
    var rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-11;

    // @public - the position of the ruler in the model
    this.rulerPositionProperty = new Property( new Vector2( 0, -0.75E-11 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioType: PropertyIO( Vector2IO )
    } );

    CoulombsLawCommonModel.call( this, charge1, charge2, leftBoundary, rightBoundary, tandem, {
      minSeparationBetweenObjects: 1E-13,
      snapObjectsToNearest: 1E-12
    } );
  }

  coulombsLaw.register( 'CoulombsLawAtomicModel', CoulombsLawAtomicModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawAtomicModel );
} );