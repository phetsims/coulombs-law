// Copyright 2017-2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const CoulombsLawAtomicScreen = require( 'COULOMBS_LAW/atomic/CoulombsLawAtomicScreen' );
  const CoulombsLawGlobalOptionsNode = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobalOptionsNode' );
  const CoulombsLawKeyboardHelpContent = require( 'COULOMBS_LAW/common/view/CoulombsLawKeyboardHelpContent' );
  const CoulombsLawMacroScreen = require( 'COULOMBS_LAW/macro/CoulombsLawMacroScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const coulombsLawTitleString = require( 'string!COULOMBS_LAW/coulombs-law.title' );

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

    // Creates content for the Options dialog
    createOptionsDialogContent: tandem => new CoulombsLawGlobalOptionsNode( tandem ),
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
