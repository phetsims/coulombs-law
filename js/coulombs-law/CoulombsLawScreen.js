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
  var CoulombsLawModel = require( 'COULOMBS_LAW/coulombs-law/model/CoulombsLawModel' );
  var CoulombsLawScreenView = require( 'COULOMBS_LAW/coulombs-law/view/CoulombsLawScreenView' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.createRootTandem();

  /**
   * @constructor
   */
  function CoulombsLawScreen() {

    var options = {
      backgroundColorProperty: new Property( 'white' )
    };

    var coulombsLawScreenTandem = tandem.createTandem( 'coulombsLawScreen' );

    Screen.call( this,
      function() { return new CoulombsLawModel( coulombsLawScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawScreenView( model, coulombsLawScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CoulombsLawScreen', CoulombsLawScreen );

  return inherit( Screen, CoulombsLawScreen );
} );