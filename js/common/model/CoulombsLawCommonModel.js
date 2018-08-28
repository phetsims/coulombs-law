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
  var PropertyIO = require( 'AXON/PropertyIO' );

  // ifphetio
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );

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
      snapObjectsToNearest: 0.1,
      displayScientificNotation: true
    }, options );

    // @public - controls whether we display the force values in decimal or scientific notation format
    // REVIEW: Doc type Property.<boolean>?
    this.scientificNotationProperty = new Property( options.displayScientificNotation, {
      tandem: tandem.createTandem( 'scientificNotation' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    ISLCModel.call( this, ISLCConstants.k, charge1, charge2, leftBoundary, rightBoundary, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

  return inherit( ISLCModel, CoulombsLawCommonModel, {

    // @public resets the model
    reset: function() {
      this.rulerPositionProperty.reset();
      this.scientificNotationProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );