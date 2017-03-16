// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );

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

  return inherit( Object, CoulombsLawModel, {

    // @public resets the model
    reset: function() {
      //TODO reset things here
    },

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );