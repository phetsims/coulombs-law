// Copyright 2017-2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CoulombsLawAtomicScreen from './atomic/CoulombsLawAtomicScreen.js';
import CoulombsLawGlobalOptionsNode from './common/view/CoulombsLawGlobalOptionsNode.js';
import CoulombsLawKeyboardHelpContent from './common/view/CoulombsLawKeyboardHelpContent.js';
import coulombsLawStrings from './coulombsLawStrings.js';
import CoulombsLawMacroScreen from './macro/CoulombsLawMacroScreen.js';

const coulombsLawTitleString = coulombsLawStrings[ 'coulombs-law' ].title;

const tandem = Tandem.ROOT;

const simOptions = {
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
  keyboardHelpNode: new CoulombsLawKeyboardHelpContent()
};

SimLauncher.launch( function() {
  const screens = [
    new CoulombsLawMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CoulombsLawAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];
  const sim = new Sim( coulombsLawTitleString, screens, simOptions );
  sim.start();
} );