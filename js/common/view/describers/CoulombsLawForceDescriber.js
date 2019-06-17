// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );

  class CoulombsLawForceDescriber extends ForceDescriber {

    /**
     * @param {ISLCModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, object1Label, object2Label, positionDescriber ) {
      super( model, object1Label, object2Label, positionDescriber );
    }

    /**
     * @param {number} force in newtons
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number}
     * @override
     * @protected
     */
    getForceVectorIndex( force, numberOfRegions ) {

      // TODO: implement when working on CL descriptions.
      return 0;
    }
  }

  return coulombsLaw.register( 'CoulombsLawForceDescriber', CoulombsLawForceDescriber );
} );