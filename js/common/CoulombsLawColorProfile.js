// Copyright 2017-2019, University of Colorado Boulder

/**
 * Creates a color profile to handle both a default and projector mode. Mostly allows nodes to be seen with a white
 * background.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */
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

  var CoulombsLawColorProfile = new ColorProfile( [ 'default', 'projector' ], {
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
  } );

  coulombsLaw.register( 'CoulombsLawColorProfile', CoulombsLawColorProfile );

  return CoulombsLawColorProfile;
} );