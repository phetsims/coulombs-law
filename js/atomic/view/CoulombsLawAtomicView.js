// Copyright 2017-2022, University of Colorado Boulder

/**
 * Atomic scale specific screen view. Adds charge, ruler, and legend nodes that all require scale-specific instantiation.
 * Also creates the proper model/view scaling.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import InverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import DefaultDirection from '../../../../inverse-square-law-common/js/view/DefaultDirection.js';
import ISLCAlertManager from '../../../../inverse-square-law-common/js/view/ISLCAlertManager.js';
import ISLCLegendNode from '../../../../inverse-square-law-common/js/view/ISLCLegendNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import CoulombsLawColors from '../../common/CoulombsLawColors.js';
import ChargeNode from '../../common/view/ChargeNode.js';
import CoulombsLawCommonView from '../../common/view/CoulombsLawCommonView.js';
import CoulombsLawForceDescriber from '../../common/view/describers/CoulombsLawForceDescriber.js';
import CoulombsLawPositionDescriber from '../../common/view/describers/CoulombsLawPositionDescriber.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawStrings from '../../CoulombsLawStrings.js';

const charge1AbbreviatedString = CoulombsLawStrings.charge1Abbreviated;
const charge2AbbreviatedString = CoulombsLawStrings.charge2Abbreviated;
const pmScaleString = CoulombsLawStrings.pmScale;
const unitsAtomicLegendScaleString = CoulombsLawStrings.units.atomicLegendScale;
const unitsAtomicUnitsString = CoulombsLawStrings.units.atomicUnits;
const unitsPicometersString = InverseSquareLawCommonStrings.units.picometers;

// constants
const SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
const MODEL_VIEW_TRANSFORM_SCALE = 5E12; // scales the modelViewTransform for accurate positioning on Macro and Atomic screens
const ARROW_MAX_WIDTH = 10000;

class CoulombsLawAtomicView extends CoulombsLawCommonView {

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {Tandem} tandem
   */
  constructor( coulombsLawModel, tandem ) {

    const rulerOptions = {
      snapToNearest: 1E-12, // in model coordinates
      majorTickLabels: [ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
      unitString: unitsPicometersString,
      rulerInset: 15
    };

    const positionDescriber = new CoulombsLawPositionDescriber( coulombsLawModel, 'label1', 'label2' );
    const forceDescriber = new CoulombsLawForceDescriber( coulombsLawModel, 'label1', 'label2', positionDescriber );
    const alertManager = new ISLCAlertManager( coulombsLawModel, forceDescriber );

    super( coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, MODEL_VIEW_TRANSFORM_SCALE, rulerOptions, tandem );

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
        pullerNodeOptions: {
          atomicScale: true
        },
        arrowNodeOptions: {
          forceReadoutDecimalPlaces: 9,
          maxArrowWidth: ARROW_MAX_WIDTH
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
        pullerNodeOptions: {
          atomicScale: true
        },
        arrowNodeOptions: {
          forceReadoutDecimalPlaces: 9,
          maxArrowWidth: ARROW_MAX_WIDTH
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

    // create a line the length of 1 picometer
    const legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 10E-12 );

    const legendNode = new ISLCLegendNode(
      legendNodeLineLength, // length of the line
      unitsAtomicLegendScaleString, // unit string
      {
        fill: CoulombsLawColors.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        left: this.layoutBounds.minX + 9.35,
        tandem: tandem.createTandem( 'atomicLegendNode' )
      } );

    this.addChild( legendNode );

    // add picometer conversion string
    const picometerScaleText = new RichText( pmScaleString, {
      fill: CoulombsLawColors.legendNodeFillProperty,
      font: new PhetFont( 12 ),
      maxWidth: 180,
      centerY: legendNode.localToParentPoint( legendNode.legendArrowLine.center ).y,
      left: legendNode.right + 10,
      tandem: tandem.createTandem( 'picometerScaleText' )
    } );

    this.addChild( picometerScaleText );

    // pdom - charges are first in focus order
    const charges = [ chargeNode1, chargeNode2 ];

    // pdom - traversal order for the screenview (ParallelDOM.js setter)
    this.pdomPlayAreaNode.pdomOrder = charges.concat( this.pdomPlayAreaNode.pdomOrder );
  }
}

coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );
export default CoulombsLawAtomicView;