// Copyright 2017-2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var CoulombsLawAtomicScreen = require( 'COULOMBS_LAW/atomic/CoulombsLawAtomicScreen' );
  var CoulombsLawGlobalOptionsNode = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobalOptionsNode' );
  var CoulombsLawKeyboardHelpContent = require( 'COULOMBS_LAW/common/view/CoulombsLawKeyboardHelpContent' );
  var CoulombsLawMacroScreen = require( 'COULOMBS_LAW/macro/CoulombsLawMacroScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var coulombsLawTitleString = require( 'string!COULOMBS_LAW/coulombs-law.title' );

  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Jesse Greenberg, Michael Barlow',
      team: 'Amy Hanson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Liam Mulhall, Laura Rea, Jacob Romero, Katie Woessner, Kelly Wurtz',
      graphicArts: 'Mariah Hermsmeyer, Cheryl McCutchan',
      thanks: ''
    },
    optionsNode: new CoulombsLawGlobalOptionsNode( Tandem.globalTandem.createTandem( 'options' ) ),
    accessibility: true,
    keyboardHelpNode: new CoulombsLawKeyboardHelpContent()
  };

  SimLauncher.launch( function() {
    var screens = [
      new CoulombsLawMacroScreen( tandem.createTandem( 'macroScreen' ) ),
      new CoulombsLawAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
    ];
    var sim = new Sim( coulombsLawTitleString, screens, simOptions );
    sim.start();
  } );
} );
