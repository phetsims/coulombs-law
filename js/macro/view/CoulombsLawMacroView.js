// Copyright 2017-2022, University of Colorado Boulder

/**
 * Class for Macro subscreen. Adds charge, ruler, and legend elements and creates the necessary scale factor for proper
 * model/view consistency.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import DefaultDirection from '../../../../inverse-square-law-common/js/view/DefaultDirection.js';
import ISLCAlertManager from '../../../../inverse-square-law-common/js/view/ISLCAlertManager.js';
import ISLCLegendNode from '../../../../inverse-square-law-common/js/view/ISLCLegendNode.js';
import CoulombsLawColors from '../../common/CoulombsLawColors.js';
import ChargeNode from '../../common/view/ChargeNode.js';
import CoulombsLawCommonView from '../../common/view/CoulombsLawCommonView.js';
import CoulombsLawForceDescriber from '../../common/view/describers/CoulombsLawForceDescriber.js';
import CoulombsLawPositionDescriber from '../../common/view/describers/CoulombsLawPositionDescriber.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawStrings from '../../CoulombsLawStrings.js';

const charge1AbbreviatedString = CoulombsLawStrings.charge1Abbreviated;
const charge2AbbreviatedString = CoulombsLawStrings.charge2Abbreviated;
const unitsMacroLegendScaleString = CoulombsLawStrings.units.macroLegendScale;

const unitsMicrocoulombsString = CoulombsLawStrings.units.microcoulombs;

// constants
const SCALE_FACTOR = 1E6;  // number of microcoulombs in one C
const MODEL_VIEW_TRANSFORM_SCALE = 5000;

class CoulombsLawMacroView extends CoulombsLawCommonView {

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {Tandem} tandem
   */
  constructor( coulombsLawModel, tandem ) {

    const rulerOptions = {
      snapToNearest: 0.001  // in model coordinates
    };

    const positionDescriber = new CoulombsLawPositionDescriber( coulombsLawModel, 'label1', 'label2' );
    const forceDescriber = new CoulombsLawForceDescriber( coulombsLawModel, 'label1', 'label2', positionDescriber );
    const alertManager = new ISLCAlertManager( coulombsLawModel, forceDescriber );

    super( coulombsLawModel, SCALE_FACTOR, unitsMicrocoulombsString, MODEL_VIEW_TRANSFORM_SCALE, rulerOptions, tandem );

    // charge nodes added in each screen to allow for different decimal precision and arrow height
    const chargeNode1 = new ChargeNode(
      coulombsLawModel,
      coulombsLawModel.object1,
      this.layoutBounds,
      this.modelViewTransform,
      alertManager,
      forceDescriber,
      positionDescriber,
      {
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: DefaultDirection.LEFT,
        arrowColor: '#66f',
        forceArrowHeight: 70,
        arrowNodeOptions: {
          forceReadoutDecimalPlaces: 3
        },
        tandem: tandem.createTandem( 'chargeNode1' )
      } );

    const chargeNode2 = new ChargeNode(
      coulombsLawModel,
      coulombsLawModel.object2,
      this.layoutBounds,
      this.modelViewTransform,
      alertManager,
      forceDescriber,
      positionDescriber,
      {
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: DefaultDirection.RIGHT,
        arrowColor: '#f66',
        forceArrowHeight: 120,
        arrowNodeOptions: {
          forceReadoutDecimalPlaces: 3
        },
        tandem: tandem.createTandem( 'chargeNode2' )
      } );

    // charge nodes and arrows are added to the bottom of the scene graph so that the ruler will appear above them yet
    // still below the control panels (which are added in the CommonView)
    this.insertChild( 0, chargeNode1 );
    this.insertChild( 0, chargeNode2 );

    // the arrows and their labels should be above both charges (and their markers) but below
    // the ruler and control panels
    this.insertChild( 1, chargeNode1.arrowNode );
    this.insertChild( 1, chargeNode2.arrowNode );

    // create a line the length of 1 cm
    const legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 1E-2 );

    const legendNode = new ISLCLegendNode(
      legendNodeLineLength, // length of the line
      unitsMacroLegendScaleString, // unit string
      {
        fill: CoulombsLawColors.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        left: this.layoutBounds.minX + 9.35,
        tandem: tandem.createTandem( 'legendNode' )
      } );

    this.addChild( legendNode );

    // pdom - charges are first in accessible order, followed by control panel in supertype
    const charges = [ chargeNode1, chargeNode2 ];
    this.pdomPlayAreaNode.pdomOrder = charges.concat( this.pdomPlayAreaNode.pdomOrder );
  }
}

coulombsLaw.register( 'CoulombsLawMacroView', CoulombsLawMacroView );
export default CoulombsLawMacroView;