// Copyright 2017, University of Colorado Boulder
define(function(require) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Color = require( 'SCENERY/util/Color' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );

  // constants
  var BLACK = new Color( 0, 0, 0 );
  var WHITE = new Color( 255, 255, 255 );
  // var RED = new Color( 255, 0, 0 );
  // var BLUE = new Color( 0, 0, 255 );

  var CoulombsLawColorProfile = new ColorProfile( {
    background: {
      default: BLACK,
      projector: WHITE
    },
    forceArrowFill: {
      default: WHITE,
      projector: BLACK
    },
    forceArrowStroke: {
      default: BLACK,
      projector: WHITE
    },
    forceArrowLabelFill: {
      default: WHITE,
      projector: BLACK
    },
    forceArrowLabelStroke: {
      default: BLACK,
      projector: WHITE
    },
    rulerStroke: {
      default: BLACK,
      projector: WHITE
    }
  }, [ 'default', 'projector' ] );

  coulombsLaw.register( 'CoulombsLawColorProfile', CoulombsLawColorProfile );

  return CoulombsLawColorProfile;
} );