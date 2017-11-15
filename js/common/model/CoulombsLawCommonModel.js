// Copyright 2017, University of Colorado Boulder

/**
 * Base model for all Coulombs Law sim screens. Allows for distinct instantiation details for both atomic and macro scales.
 * Inherits from the base ISLCModel that is responsible for all force calculation between the model's charge objects.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Property = require( 'AXON/Property' );
  var TProperty = require( 'AXON/TProperty' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @param {Charge} charge1 - The left charge
   * @param {Charge} charge2 - The right charge
   * @param {number} leftBoundary
   * @param {number} rightBoundary
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function CoulombsLawCommonModel( charge1, charge2, leftBoundary, rightBoundary, tandem, options ) {

    options = _.extend( {
      snapObjectsToNearest: 0.1
    }, options );

    // @public - controls whether we display the force values in decimal or scientific notation format
    this.scientificNotationProperty = new Property( true, {
      tandem: tandem.createTandem( 'scientificNotation' ),
      phetioType: TProperty( TBoolean )
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