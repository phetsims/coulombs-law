// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Charge = require( 'COULOMBS_LAW/common/model/Charge' );
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonModel = require( 'COULOMBS_LAW/common/model/CoulombsLawCommonModel' );
  var Range = require( 'DOT/Range' );
  var TVector2 = require( 'DOT/TVector2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'AXON/Property' );

  // constants
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );

  /**
   * @constructor
   */
  function CoulombsLawAtomicModel( tandem ) {

    // conversion factor for atomic units
    var e = ISLCConstants.coulombsPerAtomicUnit;

    // set initial charge values
    // TODO: consider creating charges/masses in subtypes
    
    var chargeValue1 = e; // charge in Coulombs
    var chargeValue2 = -e; // charge in Coulombs

    var position1 = -2E-11; // initial position from center in m (20pm)
    var position2 = 2E-11; // initial position from center in m (20pm)

    var minChargeValue = -10 * e; // in Coulombs
    var maxChargeValue = 10 * e; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var charge1 = new Charge( chargeValue1, position1, valueRange, baseColor1, tandem, { 
      constantRadius: 1.5E-12,
      tandemUnits: 'coulombs'
    } );
    var charge2 = new Charge( chargeValue2, position2, valueRange, baseColor2, tandem, { 
      constantRadius: 1.5E-12,
      tandemUnits: 'coulombs'
    } );

    var leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-11;
    var rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-11;

    this.rulerPositionProperty = new Property( new Vector2( -5.2E-11, 1.75E-11 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    CoulombsLawCommonModel.call( this, charge1, charge2, leftBoundary, rightBoundary, tandem, {
      minSeparationBetweenObjects: 1E-13,
      snapObjectsToNearest: 1E-13
    } );
  }

  coulombsLaw.register( 'CoulombsLawAtomicModel', CoulombsLawAtomicModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawAtomicModel );
} );