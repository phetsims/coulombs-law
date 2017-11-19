// Copyright 2017, University of Colorado Boulder

/**
 * Registers the root tandem for all global properties.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function ( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Tandem = require( 'TANDEM/Tandem' );

  return coulombsLaw.register( 'CoulombsLawCommonConstants', {
    GLOBALS_TANDEM: Tandem.rootTandem.createTandem( 'globals' )
  } );
} ); 