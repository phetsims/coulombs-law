// Copyright 2017-2021, University of Colorado Boulder

/**
 * Creates a color profile to handle both a default and projector mode. Mostly allows nodes to be seen with a white
 * background.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import ColorProfile from '../../../scenery-phet/js/ColorProfile.js';
import Color from '../../../scenery/js/util/Color.js';
import coulombsLaw from '../coulombsLaw.js';

// constants
const BLACK = new Color( 0, 0, 0 );
const WHITE = new Color( 255, 255, 255 );
const GREEN = new Color( 0, 255, 0 );

const coulombsLawColorProfile = new ColorProfile( [ 'default', 'projector' ], {
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

coulombsLaw.register( 'coulombsLawColorProfile', coulombsLawColorProfile );

export default coulombsLawColorProfile;