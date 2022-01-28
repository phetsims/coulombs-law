// Copyright 2017-2022, University of Colorado Boulder

/**
 * Scenery node for the charge object. Children include the pusher/pullers, the circular charge, the force arrow, and
 * all labels. Most instantiation details are handled in ISLCObjectNode including all Property linking and drawing.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 *
 */

import ForceValuesDisplayEnum from '../../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ISLCObjectNode from '../../../../inverse-square-law-common/js/view/ISLCObjectNode.js';
import merge from '../../../../phet-core/js/merge.js';
import { RadialGradient } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawColors from '../CoulombsLawColors.js';

// constants
const CHARGE_NODE_Y_POSITION = 205;

class ChargeNode extends ISLCObjectNode {

  /**
   * @param {CoulombsLawCommonModel} model
   * @param {Charge} chargeObjectModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ISLCAlertManager} alertManager
   * @param {ForceDescriber} forceDescriber
   * @param {PositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, chargeObjectModel, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options ) {

    options = merge( {
      label: 'This Charge', // TODO: factor out into strings files
      otherObjectLabel: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest,
      attractNegative: true,
      y: CHARGE_NODE_Y_POSITION,

      pullerNodeOptions: {
        displayShadow: false
      },

      arrowNodeOptions: {
        maxArrowWidth: 50,
        forceReadoutDecimalPlaces: 9,

        // colors for projector and default modes
        labelFill: CoulombsLawColors.forceArrowLabelFillProperty,
        arrowLabelFill: CoulombsLawColors.forceArrowLabelFillProperty,
        arrowFill: CoulombsLawColors.forceArrowFillProperty,
        arrowStroke: CoulombsLawColors.forceArrowStrokeProperty,
        labelShadowFill: CoulombsLawColors.labelShadowFillProperty,
        backgroundFill: CoulombsLawColors.backgroundProperty
      },
      labelOptions: {
        fill: CoulombsLawColors.forceArrowLabelFillProperty
      },

      // phet-io
      tandem: Tandem.REQUIRED,

      // TODO: proper sting usage
      a11yCreateAriaValueText: formattedValue => `${formattedValue} coulombs`
    }, options );

    super(
      model,
      chargeObjectModel,
      layoutBounds,
      modelViewTransform,
      alertManager,
      forceDescriber,
      positionDescriber,
      options
    );

    // @private - Used for incrementing the radius to prevent division by zero in RadialGradient
    this.snapToNearest = options.snapToNearest;

    // force display Property is never removed/destroyed, no disposal required
    model.forceValuesDisplayProperty.lazyLink( this.redrawForce.bind( this ) );

    // stroke added here for projector mode and white bg printing options
    this.objectCircle.stroke = 'black';
    this.objectCircle.lineWidth = 0.5;
  }

  /**
   * Alter the radial gradient based on the radius of the charge object
   * @param  {Color} baseColor
   * @protected
   * @override
   */
  updateGradient( baseColor ) {
    let radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );

    // if the radius = 1, radial gradient will throw an divide-by-zero error
    // ensure inequality
    radius = radius === 1 ? radius + this.snapToNearest : radius;

    this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
      .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
      .addColorStop( 1, baseColor.toCSS() );
  }

  /**
   * Updates the node's arrow length, force readout, and puller image.
   * @private
   */
  redrawForce() {
    this.arrowNode.scientificNotationMode = this.model.forceValuesDisplayProperty.value === ForceValuesDisplayEnum.SCIENTIFIC;
    super.redrawForce();
  }
}

coulombsLaw.register( 'ChargeNode', ChargeNode );

export default ChargeNode;