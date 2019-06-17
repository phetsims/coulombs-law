// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );

  class CoulombsLawPositionDescriber extends PositionDescriber {

    /**
     * @param {ISLCModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     */
    constructor( model, object1Label, object2Label ) {
      super( model, object1Label, object2Label );
    }

    /**
     *
     * @protected
     * @param {number} distance
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number}
     * @override
     */
    getDistanceIndex( distance, numberOfRegions ) {
      assert && assert( distance > 0, 'Distance between spheres should always be positive.' );

      // TODO: implement when working on CL descriptions.
      return 0;
    }
  }

  return coulombsLaw.register( 'CoulombsLawPositionDescriber', CoulombsLawPositionDescriber );
} );