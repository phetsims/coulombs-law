// Copyright 2017-2021, University of Colorado Boulder

/**
 * Creates a color profile to handle both a default and projector mode. Mostly allows nodes to be seen with a white
 * background.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import coulombsLaw from '../coulombsLaw.js';

// constants
const BLACK = new Color( 0, 0, 0 );
const WHITE = new Color( 255, 255, 255 );
const GREEN = new Color( 0, 255, 0 );

const coulombsLawColorProfile = {
  backgroundProperty: new ProfileColorProperty( 'background', {
    default: BLACK,
    projector: WHITE
  } ),
  forceArrowFillProperty: new ProfileColorProperty( 'forceArrowFill', {
    default: WHITE,
    projector: BLACK
  } ),
  forceArrowStrokeProperty: new ProfileColorProperty( 'forceArrowStroke', {
    default: BLACK,
    projector: WHITE
  } ),
  forceArrowLabelFillProperty: new ProfileColorProperty( 'forceArrowLabelFill', {
    default: WHITE,
    projector: BLACK
  } ),
  labelShadowFillProperty: new ProfileColorProperty( 'labelShadowFill', {
    default: BLACK,
    projector: WHITE
  } ),
  legendNodeFillProperty: new ProfileColorProperty( 'legendNodeFill', {
    default: GREEN,
    projector: BLACK
  } ),
  legendNodeStrokeProperty: new ProfileColorProperty( 'legendNodeStroke', {
    default: BLACK,
    projector: WHITE
  } )
};

coulombsLaw.register( 'coulombsLawColorProfile', coulombsLawColorProfile );

export default coulombsLawColorProfile;