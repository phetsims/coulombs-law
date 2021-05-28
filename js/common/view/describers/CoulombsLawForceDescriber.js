// Copyright 2019-2021, University of Colorado Boulder


import ForceDescriber from '../../../../../inverse-square-law-common/js/view/describers/ForceDescriber.js';
import coulombsLaw from '../../../coulombsLaw.js';

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

coulombsLaw.register( 'CoulombsLawForceDescriber', CoulombsLawForceDescriber );
export default CoulombsLawForceDescriber;