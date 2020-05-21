// Copyright 2019, University of Colorado Boulder

/**
 * NOTE: This is just a stub because coulombs law is not yet implemented with interactive
 * descriptions, but has shared code with the gravity force lab sims.
 *
 * This describer is responsible for the descriptions associated with the moveable ruler. Unlike other describers, this
 * type also alerts based on the movement of the ruler. This is a bit non-traditional, but made sense based on the
 * modularity of ruler specific content.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ISLCDescriber from '../../../../../inverse-square-law-common/js/view/describers/ISLCDescriber.js';
import coulombsLaw from '../../../coulombsLaw.js';

class CoulombsLawRulerDescriber extends ISLCDescriber {

  // @private
  onDrag() {}

  // @private
  getRegionAndDistance() {return ''; }

  // @private
  getRulerGrabbedAlertable() {return ''; }

  // @private
  onGrab() { }

  // @private
  alertJumpHome() { }

  // @private
  getJumpCenterMassAlert() { return ''; }

  // @private
  alertJumpCenterMass() { }

  // @private
  reset() { }
}

coulombsLaw.register( 'CoulombsLawRulerDescriber', CoulombsLawRulerDescriber );
export default CoulombsLawRulerDescriber;