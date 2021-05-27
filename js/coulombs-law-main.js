// Copyright 2017-2021, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CoulombsLawAtomicScreen from './atomic/CoulombsLawAtomicScreen.js';
import CoulombsLawGlobalOptionsNode from './common/view/CoulombsLawGlobalOptionsNode.js';
import coulombsLawStrings from './coulombsLawStrings.js';
import CoulombsLawMacroScreen from './macro/CoulombsLawMacroScreen.js';

const coulombsLawTitleString = coulombsLawStrings[ 'coulombs-law' ].title;

const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Amy Rouinfar',
    softwareDevelopment: 'Jesse Greenberg, Michael Barlow',
    team: 'Amy Hanson, Ariel Paul, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Liam Mulhall, Laura Rea, Jacob Romero, Kathryn Woessner, Kelly Wurtz',
    graphicArts: 'Mariah Hermsmeyer, Cheryl McCutchan',
    thanks: ''
  },

  // Creates content for the Options dialog
  createOptionsDialogContent: tandem => new CoulombsLawGlobalOptionsNode( tandem ),
  hasKeyboardHelpContent: true
};

simLauncher.launch( () => {
  const screens = [
    new CoulombsLawMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CoulombsLawAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];
  const sim = new Sim( coulombsLawTitleString, screens, simOptions );
  sim.start();
} );