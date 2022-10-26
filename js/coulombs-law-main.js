// Copyright 2017-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CoulombsLawAtomicScreen from './atomic/CoulombsLawAtomicScreen.js';
import CoulombsLawStrings from './CoulombsLawStrings.js';
import CoulombsLawMacroScreen from './macro/CoulombsLawMacroScreen.js';

const coulombsLawTitleStringProperty = CoulombsLawStrings[ 'coulombs-law' ].titleStringProperty;

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

  preferencesModel: new PreferencesModel( {
    visualOptions: {
      supportsProjectorMode: true
    }
  } )
};

simLauncher.launch( () => {
  const screens = [
    new CoulombsLawMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CoulombsLawAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];
  const sim = new Sim( coulombsLawTitleStringProperty, screens, simOptions );
  sim.start();
} );