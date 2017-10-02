// Copyright 2017, University of Colorado Boulder
define(function(require) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );

  // constants
  var BLACK = new Color( 0, 0, 0 );
  var WHITE = new Color( 255, 255, 255 );
  var GREEN = new Color( 0, 255, 0 );
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
    labelShadowFill: {
      default: BLACK,
      projector: WHITE
    },
    legendNodeFill: {
      default: GREEN,
      projector: BLACK
    },
    legendNodeStroke: {
      default: BLACK,
      projector: WHITE
    }
  }, [ 'default', 'projector' ] );

  coulombsLaw.register( 'CoulombsLawColorProfile', CoulombsLawColorProfile );

  return CoulombsLawColorProfile;
} );