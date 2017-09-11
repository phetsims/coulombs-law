// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Property = require( 'AXON/Property' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  /**
   * @constructor
   */
  function CoulombsLawCommonModel( charge1, charge2, leftBoundary, rightBoundary, tandem, options ) {

    options = _.extend( {
      snapObjectsToNearest: 0.1
    }, options);

    this.scientificNotationProperty = new Property( true, {
      tandem: tandem.createTandem( 'scientificNotation' ),
      phetioValueType: TBoolean 
    } );

    ISLCModel.call( this, ISLCConstants.k, charge1, charge2, leftBoundary, rightBoundary, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

  return inherit( ISLCModel, CoulombsLawCommonModel, {

    // @public resets the model
    reset: function() {
      this.rulerPositionProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );