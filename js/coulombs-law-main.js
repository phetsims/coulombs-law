// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var CoulombsLawScreen = require( 'COULOMBS_LAW/coulombs-law/CoulombsLawScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var coulombsLawTitleString = require( 'string!COULOMBS_LAW/coulombs-law.title' );

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

  SimLauncher.launch( function() {
    var sim = new Sim( coulombsLawTitleString, [ new CoulombsLawScreen() ], simOptions );
    sim.start();
  } );
} );