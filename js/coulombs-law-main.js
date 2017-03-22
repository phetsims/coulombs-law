// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var CLMacroScreen = require( 'COULOMBS_LAW/macro/CLMacroScreen' );
  var CLAtomicScreen = require( 'COULOMBS_LAW/atomic/CLAtomicScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var coulombsLawTitleString = require( 'string!COULOMBS_LAW/coulombs-law.title' );

  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  var screens = [
    new CLMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CLAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];

  SimLauncher.launch( function() {
    var sim = new Sim( coulombsLawTitleString, screens, simOptions );
    sim.start();
  } );
} );