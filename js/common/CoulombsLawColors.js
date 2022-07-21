// Copyright 2017-2022, University of Colorado Boulder

/**
 * Creates a color profile to handle both a default and projector mode. Mostly allows nodes to be seen with a white
 * background.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import coulombsLaw from '../coulombsLaw.js';

// constants
const BLACK = new Color( 0, 0, 0 );
const WHITE = new Color( 255, 255, 255 );
const GREEN = new Color( 0, 255, 0 );

const CoulombsLawColors = {
  backgroundProperty: new ProfileColorProperty( coulombsLaw, 'background', {
    default: BLACK,
    projector: WHITE
  } ),
  forceArrowFillProperty: new ProfileColorProperty( coulombsLaw, 'forceArrowFill', {
    default: WHITE,
    projector: BLACK
  } ),
  forceArrowStrokeProperty: new ProfileColorProperty( coulombsLaw, 'forceArrowStroke', {
    default: BLACK,
    projector: WHITE
  } ),
  forceArrowLabelFillProperty: new ProfileColorProperty( coulombsLaw, 'forceArrowLabelFill', {
    default: WHITE,
    projector: BLACK
  } ),
  labelShadowFillProperty: new ProfileColorProperty( coulombsLaw, 'labelShadowFill', {
    default: BLACK,
    projector: WHITE
  } ),
  legendNodeFillProperty: new ProfileColorProperty( coulombsLaw, 'legendNodeFill', {
    default: GREEN,
    projector: BLACK
  } ),
  legendNodeStrokeProperty: new ProfileColorProperty( coulombsLaw, 'legendNodeStroke', {
    default: BLACK,
    projector: WHITE
  } )
};

coulombsLaw.register( 'CoulombsLawColors', CoulombsLawColors );

export default CoulombsLawColors;