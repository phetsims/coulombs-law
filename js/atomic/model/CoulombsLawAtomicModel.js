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
  var CoulombsLawCommonModel = require( 'COULOMBS_LAW/common/model/CoulombsLawCommonModel' );
  var Range = require( 'DOT/Range' );

  // constants
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );

  /**
   * @constructor
   */
  function CoulombsLawAtomicModel( tandem ) {

    // conversion factor for atomic units
    var e = InverseSquareLawCommonConstants.coulombsPerAtomicUnit;

    // set initial charge values
    
    var chargeValue1 = e; // charge in Coulombs
    var chargeValue2 = -e; // charge in Coulombs

    var position1 = -2E-11; // initial position from center in m
    var position2 = 2E-11; // initial position from center in m

    var minChargeValue = -10 * e; // in Coulombs
    var maxChargeValue = 10 * e; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    CoulombsLawCommonModel.call( this, chargeValue1, chargeValue2, position1, position2, valueRange, tandem, {
      minSeparationBetweenObjects: 1E-13,
      snapObjectsToNearest: 1E-13
    } );
  }

  coulombsLaw.register( 'CoulombsLawAtomicModel', CoulombsLawAtomicModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawAtomicModel );
} );