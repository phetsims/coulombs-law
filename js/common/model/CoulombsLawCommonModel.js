// Copyright 2017-2019, University of Colorado Boulder

/**
 * Base model for all Coulombs Law sim screens. Allows for distinct instantiation details for both atomic and macro scales.
 * Inherits from the base ISLCModel that is responsible for all force calculation between the model's charge objects.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );

  /**
   * @param {Charge} charge1 - The left charge
   * @param {Charge} charge2 - The right charge
   * @param {Range} locationRange
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function CoulombsLawCommonModel( charge1, charge2, locationRange, tandem, options ) {

    options = _.extend( {
      snapObjectsToNearest: 0.1,
      displayScientificNotation: true
    }, options );

    // @public {Property.<boolean>} - controls whether we display the force values in decimal or scientific notation format
    this.scientificNotationProperty = new BooleanProperty( options.displayScientificNotation, {
      tandem: tandem.createTandem( 'scientificNotationProperty' )
    } );

    ISLCModel.call( this, ISLCConstants.k, charge1, charge2, locationRange, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

  return inherit( ISLCModel, CoulombsLawCommonModel, {

    /**
     * @override
     * @returns {number}
     */
    getMinForce: function() {
      return -this.getMaxForce();
    },

    /**
     * @override
     * @returns {number}
     */
    getMaxForce: function() {

      // inherited object node accepts the entire force range. (NOTE: necessary to calculate here as Coulomb's Law allows
      // negative forces while Gravity Force Lab does not.)
      return this.calculateForce( this.object1.valueRange.max, this.object1.valueRange.max,
        this.getMinDistance( this.object1.valueProperty.get() ) ); // This assumes constant radius for Coulombs law
    },

    /**
     * Resets the model.
     *
     * @public
     */
    reset: function() {

      // As of writing this, all (both) subtypes have a rulerPositionProperty, so it is easy enough to just reset this here.
      this.rulerPositionProperty.reset();
      this.scientificNotationProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );