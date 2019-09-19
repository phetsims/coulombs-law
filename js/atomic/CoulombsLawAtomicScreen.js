// Copyright 2017-2018, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawAtomicModel = require( 'COULOMBS_LAW/atomic/model/CoulombsLawAtomicModel' );
  const CoulombsLawAtomicView = require( 'COULOMBS_LAW/atomic/view/CoulombsLawAtomicView' );
  const CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenAtomicScaleString = require( 'string!COULOMBS_LAW/screen.atomicScale' );

  // images
  const atomicScaleScreenIcon = require( 'image!COULOMBS_LAW/atomic_scale_screen_icon.png');
  const atomicScaleScreenIconNavbar = require( 'image!COULOMBS_LAW/atomic_scale_screen_icon_navbar.png' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawAtomicScreen( tandem ) {

    var options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: screenAtomicScaleString,
      homeScreenIcon: new Image( atomicScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ),
      navigationBarIcon: new Image( atomicScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ),
      tandem: tandem
    };

    var atomicScreenTandem = tandem.createTandem( 'coulombsLawAtomicScreen' );

    Screen.call( this,
      function() { return new CoulombsLawAtomicModel( atomicScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawAtomicView( model, atomicScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CoulombsLawAtomicScreen', CoulombsLawAtomicScreen );

  return inherit( Screen, CoulombsLawAtomicScreen );
} );