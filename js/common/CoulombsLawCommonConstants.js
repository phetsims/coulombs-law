// Copyright 2017, University of Colorado Boulder

define( function ( require ) {
  'use strict';

  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Tandem = require( 'TANDEM/Tandem' );

  return coulombsLaw.register( 'CoulombsLawCommonConstants', {
    GLOBALS_TANDEM: Tandem.createStaticTandem( 'globals' )
  } );
} ); 