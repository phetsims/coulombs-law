// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var CoulombsLawMacroModel = require( 'COULOMBS_LAW/macro/model/CoulombsLawMacroModel' );
  var CoulombsLawMacroView = require( 'COULOMBS_LAW/macro/view/CoulombsLawMacroView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenMacroScaleString = require( 'string!COULOMBS_LAW/screen.macroScale' );

  // images
  var macroScreenIcon = require( 'image!COULOMBS_LAW/macro_screen_icon.png' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroScreen( tandem ) {

    var options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: screenMacroScaleString,
      homeScreenIcon: new Image( macroScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ),
      tandem: tandem
    };

    var macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

    Screen.call( this,
      function() { return new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CoulombsLawMacroScreen', CoulombsLawMacroScreen );

  return inherit( Screen, CoulombsLawMacroScreen );
} );