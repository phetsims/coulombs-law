// Copyright 2017-2018, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  const CoulombsLawMacroModel = require( 'COULOMBS_LAW/macro/model/CoulombsLawMacroModel' );
  const CoulombsLawMacroView = require( 'COULOMBS_LAW/macro/view/CoulombsLawMacroView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenMacroScaleString = require( 'string!COULOMBS_LAW/screen.macroScale' );

  // images
  const macroScaleScreenIcon = require( 'image!COULOMBS_LAW/macro_scale_screen_icon.png' );
  const macroScaleScreenIconNavbar = require( 'image!COULOMBS_LAW/macro_scale_screen_icon_navbar.png' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroScreen( tandem ) {

    const options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: screenMacroScaleString,
      homeScreenIcon: new Image( macroScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ),
      navigationBarIcon: new Image( macroScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ),
      tandem: tandem
    };

    const macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

    Screen.call( this,
      function() { return new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CoulombsLawMacroScreen', CoulombsLawMacroScreen );

  return inherit( Screen, CoulombsLawMacroScreen );
} );