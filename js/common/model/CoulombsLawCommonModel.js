// Copyright 2017-2022, University of Colorado Boulder

/**
 * Base model for all Coulombs Law sim screens. Allows for distinct instantiation details for both atomic and macro scales.
 * Inherits from the base ISLCModel that is responsible for all force calculation between the model's charge objects.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import ForceValuesDisplayEnum from '../../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ISLCModel from '../../../../inverse-square-law-common/js/model/ISLCModel.js';
import merge from '../../../../phet-core/js/merge.js';
import coulombsLaw from '../../coulombsLaw.js';

class CoulombsLawCommonModel extends ISLCModel {

  /**
   * @param {Charge} charge1 - The left charge
   * @param {Charge} charge2 - The right charge
   * @param {Range} positionRange
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( charge1, charge2, positionRange, tandem, options ) {

    options = merge( {
      snapObjectsToNearest: 0.1,
      displayScientificNotation: true,
      initialRulerPosition: new Vector2( 0, -1.1E-2 )
    }, options );

    super( ISLCConstants.k, charge1, charge2, positionRange, tandem, options );

    // @public - the position of the ruler in the model
    this.rulerPositionProperty = new Vector2Property( options.initialRulerPosition, {
      tandem: tandem.createTandem( 'rulerPositionProperty' )
    } );

    // @public
    this.forceValuesDisplayProperty = new EnumerationDeprecatedProperty( ForceValuesDisplayEnum, ForceValuesDisplayEnum.DECIMAL, {
      tandem: tandem.createTandem( 'forceValuesDisplayProperty' ),
      phetioDocumentation: 'This determines the display type for the force values: in decimal or scientific ' +
                           'notation, and also hidden.'
    } );

    // ISLC code listens substantially to showForceValuesProperty, so keep that in sync as the display type changes.
    this.forceValuesDisplayProperty.lazyLink( newValue => {
      this.showForceValuesProperty.value = newValue === ForceValuesDisplayEnum.DECIMAL ||
                                           newValue === ForceValuesDisplayEnum.SCIENTIFIC;
    } );
  }

  /**
   * @protected
   * @override
   * @returns {number}
   */
  getMinForce() {
    return -this.getMaxForce();
  }

  /**
   * @public
   * @override
   * @returns {number}
   */
  getMaxForce() {

    // TODO: should this call snapToGrid?
    // inherited object node accepts the entire force range. (NOTE: necessary to calculate here as Coulomb's Law allows
    // negative forces while Gravity Force Lab does not.)
    return this.calculateForce( this.object1.valueRange.max, this.object1.valueRange.max,
      this.getMinDistance( this.object1.valueProperty.get() ) ); // This assumes constant radius for Coulombs law
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {

    // As of writing this, all (both) subtypes have a rulerPositionProperty, so it is easy enough to just reset this here.
    this.rulerPositionProperty.reset();
    this.forceValuesDisplayProperty.reset();
    super.reset();
  }
}

coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

export default CoulombsLawCommonModel;