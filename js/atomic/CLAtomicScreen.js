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
  var CoulombsLawAtomicModel = require( 'COULOMBS_LAW/atomic/model/CoulombsLawAtomicModel' );
  var CoulombsLawView = require( 'COULOMBS_LAW/common/view/CoulombsLawView' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.createRootTandem();

  // strings
  var atomicString = require( 'string!COULOMBS_LAW/atomic' );

  /**
   * @constructor
   */
  function CLAtomicScreen() {

    var options = {
      backgroundColorProperty: new Property( 'black' ),
      name: atomicString
    };

    var atomicScreenTandem = tandem.createTandem( 'coulombsLawAtomicScreen' );

    Screen.call( this,
      function() { return new CoulombsLawAtomicModel( atomicScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawView( model, atomicScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CLAtomicScreen', CLAtomicScreen );

  return inherit( Screen, CLAtomicScreen );
} );