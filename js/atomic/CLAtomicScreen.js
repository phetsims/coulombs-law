// Copyright 2017, University of Colorado Boulder

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
  var atomicString = require( 'string!COULOMBS_LAW/atomic' );

  // images
  var atomicScaleScreenIcon = require( 'image!COULOMBS_LAW/atomic_scale_screen_icon.png');

  /**
   * @constructor
   */
  function CLAtomicScreen( tandem ) {

    var options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: atomicString,
      homeScreenIcon: new Image( atomicScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } )
    };

    var atomicScreenTandem = tandem.createTandem( 'coulombsLawAtomicScreen' );

    Screen.call( this,
      function() { return new CoulombsLawAtomicModel( atomicScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawAtomicView( model, atomicScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CLAtomicScreen', CLAtomicScreen );

  return inherit( Screen, CLAtomicScreen );
} );