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
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var TVector2 = require( 'DOT/TVector2' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  /**
   * @constructor
   */
  function CoulombsLawCommonModel( charge1Value, charge2Value, charge1Position, charge2Position, valueRange, tandem, options ) {

    this.rulerPositionProperty = new Property( new Vector2( -5.2, 1.75 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var charge1 = new Charge( charge1Value, charge1Position, valueRange, baseColor1, tandem, options );
    var charge2 = new Charge( charge2Value, charge2Position, valueRange, baseColor2, tandem, options );

    var leftBoundary = InverseSquareLawCommonConstants.LEFT_OBJECT_BOUNDARY;
    var rightBoundary = InverseSquareLawCommonConstants.RIGHT_OBJECT_BOUNDARY;

    this.scientificNotationProperty = new Property( true, {
      tandem: tandem.createTandem( 'scientificNotation' ),
      phetioValueType: TBoolean 
    } );

    InverseSquareLawModel.call( this, InverseSquareLawCommonConstants.k, charge1, charge2, leftBoundary, rightBoundary, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

  return inherit( InverseSquareLawModel, CoulombsLawCommonModel, {

    // @public resets the model
    reset: function() {
      this.rulerPositionProperty.reset();
      InverseSquareLawModel.prototype.reset.call( this );
    }
  } );
} );