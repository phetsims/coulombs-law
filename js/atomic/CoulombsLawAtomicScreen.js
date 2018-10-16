// Copyright 2017-2018, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawAtomicModel = require( 'COULOMBS_LAW/atomic/model/CoulombsLawAtomicModel' );
  var CoulombsLawAtomicView = require( 'COULOMBS_LAW/atomic/view/CoulombsLawAtomicView' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenAtomicScaleString = require( 'string!COULOMBS_LAW/screen.atomicScale' );

  // images
  var atomicScaleScreenIcon = require( 'image!COULOMBS_LAW/atomic_scale_screen_icon.png');

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawAtomicScreen( tandem ) {

    var options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: screenAtomicScaleString,
      homeScreenIcon: new Image( atomicScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ),
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