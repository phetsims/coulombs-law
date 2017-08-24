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
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var Range = require( 'DOT/Range' );
  var TVector2 = require( 'DOT/TVector2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'AXON/Property' );
  
  /**
   * @constructor
   */
  function CoulombsLawMacroModel( tandem ) {

    // set initial charge values
    
    var chargeValue1 = -2E-6; // -2 microcoulombs in Coulombs
    var chargeValue2 = 4E-6; // 4 microcoulombs in Coulombs

    var position1 = -2E-2; // initial position from center in m
    var position2 = 2E-2; // initial position from center in m

    var minChargeValue = -10E-6; // in Coulombs
    var maxChargeValue = 10E-6; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var charge1 = new Charge( chargeValue1, position1, valueRange, baseColor1, tandem, { tandemUnits: 'coulombs' } );
    var charge2 = new Charge( chargeValue2, position2, valueRange, baseColor2, tandem, { tandemUnits: 'coulombs' } );

  // boundary constants are in m, convert to cm
    var leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-2;
    var rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-2;

    this.rulerPositionProperty = new Property( new Vector2( -5.2E-2, -7.5E-3 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    CoulombsLawCommonModel.call( this, charge1, charge2, leftBoundary, rightBoundary, tandem, { snapObjectsToNearest: 0.001, minSeparationBetweenObjects: 0.001 } );
  }

  coulombsLaw.register( 'CoulombsLawMacroModel', CoulombsLawMacroModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawMacroModel );
} );