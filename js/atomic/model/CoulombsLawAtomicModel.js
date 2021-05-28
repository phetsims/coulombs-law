// Copyright 2017-2021, University of Colorado Boulder

/**
 * Model for Atomic Scale screen.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import Charge from '../../common/model/Charge.js';
import CoulombsLawCommonModel from '../../common/model/CoulombsLawCommonModel.js';
import coulombsLaw from '../../coulombsLaw.js';

class CoulombsLawAtomicModel extends CoulombsLawCommonModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // conversion factor for atomic units
    const e = ISLCConstants.coulombsPerAtomicUnit;

    // set initial charge values
    const chargeValue1 = -2 * e; // charge in Coulombs
    const chargeValue2 = 4 * e; // charge in Coulombs

    const position1 = -2E-11; // initial position from center in m (20pm)
    const position2 = 2E-11; // initial position from center in m (20pm)

    const minChargeValue = -10 * e; // in Coulombs
    const maxChargeValue = 10 * e; // in Coulombs

    const valueRange = new Range( minChargeValue, maxChargeValue );
    const constantRadius = 9.5E-13;

    const charge1 = new Charge( chargeValue1, position1, valueRange, tandem.createTandem( 'charge1' ), {
      constantRadius: constantRadius
    } );
    const charge2 = new Charge( chargeValue2, position2, valueRange, tandem.createTandem( 'charge2' ), {
      constantRadius: constantRadius
    } );

    // boundary constants are in "X meters", convert to "X pm" (-50pm, 50pm) but still in the unit of meters
    const leftBoundary = ISLCConstants.LEFT_OBJECT_BOUNDARY * 1E-11;
    const rightBoundary = ISLCConstants.RIGHT_OBJECT_BOUNDARY * 1E-11;

    super( charge1, charge2, new Range( leftBoundary, rightBoundary ), tandem, {
      minSeparationBetweenObjects: 1E-13,
      snapObjectsToNearest: 1E-12,
      initialRulerPosition: new Vector2( 0, -1.1E-11 )
    } );
  }
}

coulombsLaw.register( 'CoulombsLawAtomicModel', CoulombsLawAtomicModel );

export default CoulombsLawAtomicModel;