// Copyright 2016, University of Colorado Boulder

/**
 * Model for one of the spherical draggable charges.
 *
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var InverseSquareLawObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawObject' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @param {number} initialCharge
   * @param {number} initialPosition
   * @param {string} baseColor
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Charge( initialCharge, initialPosition, valueRange, baseColor, tandem, options ) {

    var constantRadiusProperty = new Property( true, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    });

    InverseSquareLawObject.call( this, initialCharge, initialPosition, valueRange, constantRadiusProperty, baseColor, options );
  }

  coulombsLaw.register( 'Charge', Charge );

  return inherit( InverseSquareLawObject, Charge, {

    /**
     * @override
     */
    calculateRadius: function( mass ) {
      throw new Error( 'No radius adjustment allowed for Charge objects.' );
    },

    // @public
    reset: function() {
      this.valueProperty.reset();
      this.positionProperty.reset();
    }
  } );
} );