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
define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );

  class CoulombsLawRulerDescriber extends ISLCDescriber {

    onDrag() {}

    getRegionAndDistance() {return ''; }

    getRulerGrabbedAlertable() {return ''; }

    onGrab() { }

    alertJumpHome() { }

    getJumpCenterMassAlert() { return ''; }

    alertJumpCenterMass() { }

    reset() { }
  }

  return coulombsLaw.register( 'CoulombsLawRulerDescriber', CoulombsLawRulerDescriber );
} );
