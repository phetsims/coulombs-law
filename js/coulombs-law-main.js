// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var CLAtomicScreen = require( 'COULOMBS_LAW/atomic/CLAtomicScreen' );
  var CLMacroScreen = require( 'COULOMBS_LAW/macro/CLMacroScreen' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var CoulombsLawCommonConstants = require( 'COULOMBS_LAW/common/CoulombsLawCommonConstants' );
  var CoulombsLawGlobalOptionsNode = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobalOptionsNode' );
  var CoulombsLawGlobals = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobals' );
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
    },
    optionsNode: new CoulombsLawGlobalOptionsNode( CoulombsLawCommonConstants.GLOBALS_TANDEM.createTandem( 'options' ) )
  };

  // projectorModeProperty is never destroyed after initialization, disposal unnecessary
  CoulombsLawGlobals.projectorModeProperty.link( function( inProjectorMode ) {
    CoulombsLawColorProfile.profileNameProperty.set( inProjectorMode ? 'projector' : 'default' );
  } );

  var screens = [
    new CLMacroScreen( tandem.createTandem( 'macroScreen' ) ),
    new CLAtomicScreen( tandem.createTandem( 'atomicScreen' ) )
  ];

  SimLauncher.launch( function() {
    var sim = new Sim( coulombsLawTitleString, screens, simOptions );
    sim.start();
  } );
} );