// Copyright 2019-2024, University of Colorado Boulder
// @author Michael Kauzmann (PhET Interactive Simulations)


import PositionDescriber from '../../../../../inverse-square-law-common/js/view/describers/PositionDescriber.js';
import coulombsLaw from '../../../coulombsLaw.js';

class CoulombsLawPositionDescriber extends PositionDescriber {

  /**
   * @param {ISLCModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   */
  constructor( model, object1Label, object2Label ) {
    super( model, object1Label, object2Label );
  }
}

coulombsLaw.register( 'CoulombsLawPositionDescriber', CoulombsLawPositionDescriber );
export default CoulombsLawPositionDescriber;