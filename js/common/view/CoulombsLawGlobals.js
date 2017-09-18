// Copyright 2017, University of Colorado Boulder

define( function ( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonConstants = require( 'COULOMBS_LAW/common/CoulombsLawCommonConstants' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );

  var CoulombsLawGlobals = {
    projectorModeProperty: new BooleanProperty( phet.chipper.queryParameters.colorProfile === 'projector', {
      tandem: CoulombsLawCommonConstants.GLOBALS_TANDEM.createTandem( 'projectorModeProperty' )
    } )
  };

  coulombsLaw.register( 'CoulombsLawGlobals', CoulombsLawGlobals );

  return CoulombsLawGlobals;
} ); 