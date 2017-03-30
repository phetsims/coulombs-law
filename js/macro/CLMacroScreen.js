// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawModel = require( 'COULOMBS_LAW/common/model/CoulombsLawModel' );
  var CoulombsLawView = require( 'COULOMBS_LAW/common/view/CoulombsLawView' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.createRootTandem();

  // strings
  var macroString = require( 'string!COULOMBS_LAW/macro' );

  /**
   * @constructor
   */
  function CLMacroScreen() {

    var options = {
      backgroundColorProperty: new Property( 'black' ),
      name: macroString
    };

    var macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

    Screen.call( this,
      function() { return new CoulombsLawModel( macroScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawView( model, macroScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CLMacroScreen', CLMacroScreen );

  return inherit( Screen, CLMacroScreen );
} );