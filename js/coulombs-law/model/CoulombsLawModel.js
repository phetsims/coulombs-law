// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Charge = require( 'COULOMBS_LAW/coulombs-law/model/Charge' );
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var TVector2 = require( 'DOT/TVector2' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );

  // phet-io modules
  // var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  /**
   * @constructor
   */
  function CoulombsLawModel( tandem, options ) {

    this.rulerPositionProperty = new Property( new Vector2( 120, 270 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    // set initial charge values
    
    var chargeValue1 = 2; // charge in nC
    var chargeValue2 =2; // charge in nC

    var position1 = -2; // initial position from center in cm
    var position2 = 2; // initial position from center in cm

    var minChargeValue = -10; // in nC
    var maxChargeValue = 10; // in nC

    var valueRange = new Range( minChargeValue, maxChargeValue );

    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var charge1 = new Charge( chargeValue1, position1, valueRange, baseColor1, tandem, options );
    var charge2 = new Charge( chargeValue2, position2, valueRange, baseColor2, tandem, options );

    var leftBoundary = InverseSquareLawCommonConstants.LEFT_OBJECT_BOUNDARY;
    var rightBoundary = InverseSquareLawCommonConstants.RIGHT_OBJECT_BOUNDARY;

    InverseSquareLawModel.call( this, InverseSquareLawCommonConstants.k, charge1, charge2, leftBoundary, rightBoundary, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawModel', CoulombsLawModel );

  return inherit( InverseSquareLawModel, CoulombsLawModel, {

    // @public resets the model
    reset: function() {
      this.rulerPositionProperty.reset();
      InverseSquareLawModel.prototype.reset.call( this );
    }
  } );
} );