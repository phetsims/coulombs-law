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
  var CoulombsLawMacroScreen = require( 'COULOMBS_LAW/macro/CoulombsLawMacroScreen' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var CoulombsLawCommonConstants = require( 'COULOMBS_LAW/common/CoulombsLawCommonConstants' );
  var CoulombsLawGlobalOptionsNode = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobalOptionsNode' );
  var CoulombsLawGlobals = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobals' );
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
      // TODO: assign to @KatieWoe to fill QA once we move into testing, see
      // https://github.com/phetsims/coulombs-law/issues/64#issuecomment-417026684
      qualityAssurance: 'Steele Dalton, Liam Mulhall',
      graphicArts: 'Mariah Hermsmeyer, Cheryl McCutchan',
      thanks: ''
    },
    optionsNode: new CoulombsLawGlobalOptionsNode( CoulombsLawCommonConstants.GLOBALS_TANDEM.createTandem( 'options' ) )
  };

  // projectorModeProperty is never destroyed after initialization, disposal unnecessary
  CoulombsLawGlobals.projectorModeProperty.link( function( inProjectorMode ) {
    CoulombsLawColorProfile.profileNameProperty.set( inProjectorMode ? 'projector' : 'default' );
  } );

  var screens = [
    new CoulombsLawMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CoulombsLawAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];

  SimLauncher.launch( function() {
    var sim = new Sim( coulombsLawTitleString, screens, simOptions );
    sim.start();
  } );
} );