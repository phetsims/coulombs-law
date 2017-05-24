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
  
  /**
   * @constructor
   */
  function CoulombsLawMacroModel( tandem, options ) {

    // set initial charge values
    
    var chargeValue1 = 2E-9; // charge in Coulombs
    var chargeValue2 = 2E-9; // charge in Coulombs

    var position1 = -2E-2; // initial position from center in m
    var position2 = 2E-2; // initial position from center in m

    var minChargeValue = -10E-9; // in Coulombs
    var maxChargeValue = 10E-9; // in Coulombs

    var valueRange = new Range( minChargeValue, maxChargeValue );

    CoulombsLawCommonModel.call( this, chargeValue1, chargeValue2, position1, position2, valueRange, tandem, options );
  }

  coulombsLaw.register( 'CoulombsLawMacroModel', CoulombsLawMacroModel );

  return inherit( CoulombsLawCommonModel, CoulombsLawMacroModel );
} );