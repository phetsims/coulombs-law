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
  var CoulombsLawMacroModel = require( 'COULOMBS_LAW/macro/model/CoulombsLawMacroModel' );
  var CoulombsLawMacroView = require( 'COULOMBS_LAW/macro/view/CoulombsLawMacroView' );
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
      function() { return new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CLMacroScreen', CLMacroScreen );

  return inherit( Screen, CLMacroScreen );
} );