// Copyright 2017-2021, University of Colorado Boulder

/**
 * Model for Macro Screen with large charge values.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Range from '../../../../dot/js/Range.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import Charge from '../../common/model/Charge.js';
import CoulombsLawCommonModel from '../../common/model/CoulombsLawCommonModel.js';
import coulombsLaw from '../../coulombsLaw.js';

class CoulombsLawMacroModel extends CoulombsLawCommonModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // set initial charge values
    const chargeValue1 = -4E-6; // -4 microcoulombs in Coulombs
    const chargeValue2 = 8E-6; // 8 microcoulombs in Coulombs

    const position1 = -1E-2; // initial position from center in m
    const position2 = 2E-2; // initial position from center in m

    const minChargeValue = -10E-6; // in Coulombs
    const maxChargeValue = 10E-6; // in Coulombs

    const valueRange = new Range( minChargeValue, maxChargeValue );

    const charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ) );
    const charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ) );

    // boundary constants are in "X meters", convert to "X cm" but still in the unit of meters
    const leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-2;
    const rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-2;

    super( charge1, charge2, new Range( leftBoundary, rightBoundary ), tandem, {
      snapObjectsToNearest: 0.001,
      minSeparationBetweenObjects: 0.001,
      displayScientificNotation: false
    } );
  }
}

coulombsLaw.register( 'CoulombsLawMacroModel', CoulombsLawMacroModel );

export default CoulombsLawMacroModel;