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

  /**
   * @constructor
   */
  function CoulombsLawScreen() {

    var options = {
      backgroundColorProperty: new Property( 'white' )
    };

    Screen.call( this,
      function() { return new CoulombsLawModel(); },
      function( model ) { return new CoulombsLawScreenView( model ); },
      options
    );
  }

  coulombsLaw.register( 'CoulombsLawScreen', CoulombsLawScreen );

  return inherit( Screen, CoulombsLawScreen );
} );