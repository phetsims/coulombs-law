// Copyright 2017, University of Colorado Boulder

/**
 * Defines sim-wide properties to be manipulated from the footer navigation's options checkbox
 * (see CoulobsLawGlobalOptionsNode.js).
 *
 * @author Michael Barlow
 */

define( function ( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonConstants = require( 'COULOMBS_LAW/common/CoulombsLawCommonConstants' );

  var CoulombsLawGlobals = {
    projectorModeProperty: new BooleanProperty( phet.chipper.queryParameters.colorProfile === 'projector', {
      tandem: CoulombsLawCommonConstants.GLOBALS_TANDEM.createTandem( 'projectorModeProperty' )
    } )
  };

  coulombsLaw.register( 'CoulombsLawGlobals', CoulombsLawGlobals );

  return CoulombsLawGlobals;
} ); 