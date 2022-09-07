// Copyright 2017-2022, University of Colorado Boulder

/**
 * Parent screen view that allows for different model to view scaling for each child sim. Adds controls, checkboxes, and
 * reset buttons to the screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ISLCQueryParameters from '../../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import ISLCForceValuesDisplayControl from '../../../../inverse-square-law-common/js/view/ISLCForceValuesDisplayControl.js';
import ISLCGridNode from '../../../../inverse-square-law-common/js/view/ISLCGridNode.js';
import ISLCPanel from '../../../../inverse-square-law-common/js/view/ISLCPanel.js';
import ISLCRulerNode from '../../../../inverse-square-law-common/js/view/ISLCRulerNode.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawStrings from '../../CoulombsLawStrings.js';
import ChargeControl from './ChargeControl.js';
import CoulombsLawRulerDescriber from './describers/CoulombsLawRulerDescriber.js';

const charge1String = CoulombsLawStrings.charge1;
const charge2String = CoulombsLawStrings.charge2;

// constants
const SHOW_GRID = ISLCQueryParameters.showGrid;

class CoulombsLawCommonView extends ScreenView {

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {number} scaleFactor - multiplicative constant to distinguish between Macro and Atomic scales
   * @param {string} unitString
   * @param {number} modelViewTransformScale - allows for distinct layout scales between Macro and Atomic screens
   * @param {Object} [options]
   * @param {Tandem} tandem
   */
  constructor( coulombsLawModel, scaleFactor, unitString, modelViewTransformScale, options, tandem ) {

    super( {
      tandem: tandem,
      layoutBounds: new Bounds2( 0, 0, 768, 464 )
    } );

    const rightAlignment = this.layoutBounds.maxX - 10;
    const bottomAlignment = this.layoutBounds.maxY - 10;

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      modelViewTransformScale
    );

    // @private
    this.modelViewTransform = modelViewTransform;

    const coulombsLawParameterPanel = new ISLCPanel(
      new ISLCForceValuesDisplayControl( coulombsLawModel.forceValuesDisplayProperty, {
        tandem: tandem.createTandem( 'forceValuesDisplayControl' )
      } ), {
        tandem: tandem.createTandem( 'coulombsLawParameterPanel' ),
        fill: '#EDEDED',
        right: rightAlignment,
        bottom: bottomAlignment - 43 // empirically determined
      } );

    const charge1Control = new ChargeControl(
      charge1String,
      unitString,
      coulombsLawModel.object1.valueProperty,
      coulombsLawModel.object1.valueRange,
      scaleFactor,
      { tandem: tandem.createTandem( 'charge1Control' ) }
    );
    charge1Control.right = this.layoutBounds.centerX - 5;
    charge1Control.top = coulombsLawParameterPanel.top;

    const charge2Control = new ChargeControl(
      charge2String,
      unitString,
      coulombsLawModel.object2.valueProperty,
      coulombsLawModel.object2.valueRange,
      scaleFactor,
      {
        tandem: tandem.createTandem( 'charge2Control' )
      }
    );

    charge2Control.left = this.layoutBounds.centerX + 5;
    charge2Control.top = coulombsLawParameterPanel.top;

    const rulerDescriber = new CoulombsLawRulerDescriber( coulombsLawModel, 'label1', 'label2', {
      descriptionAlertNode: this
    } );

    // ruler drag bounds (in model coordinate frame) - assumes a single point scale inverted Y mapping
    const minX = coulombsLawModel.leftObjectBoundary;
    const minY = modelViewTransform.viewToModelY( coulombsLawParameterPanel.top + 10 ); // bottom bound because Y is inverted
    const maxX = coulombsLawModel.rightObjectBoundary;
    const maxY = -modelViewTransform.viewToModelDeltaY( this.layoutBounds.height / 2 ); // top bound because Y is inverted

    // create and add macro ruler
    const coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel.rulerPositionProperty,
      new Bounds2( minX, minY, maxX, maxY ),
      this.modelViewTransform,
      () => coulombsLawModel.object1.positionProperty.value, // wrap this in a closure instead of exposing this all to the ruler.
      rulerDescriber,
      merge( _.pick( options, [
        'snapToNearest',
        'majorTickLabels',
        'unitString',
        'rulerInset',
        'moveOnHoldDelay',
        'moveOnHoldInterval'
      ] ), {
        grabDragInteractionOptions: { grabCueOptions: { x: 155 } },
        tandem: tandem.createTandem( 'rulerNode' )
      } ) );

    // Reset All button
    // buttons are never disposed in this sim
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        coulombsLawModel.reset();
        charge1Control.reset();
        charge2Control.reset();
        coulombsLawRuler.reset();
      },
      radius: 18,
      right: rightAlignment,
      bottom: bottomAlignment,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    this.children = [
      coulombsLawRuler,
      coulombsLawParameterPanel,
      charge1Control,
      charge2Control,
      resetAllButton
    ];

    // pdom - accessible order of controls, charge objects will come first in subtypes
    this.pdomPlayAreaNode.pdomOrder = [
      coulombsLawRuler,
      charge1Control,
      charge2Control,
      coulombsLawParameterPanel,
      resetAllButton
    ];

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( SHOW_GRID ) {
      const gridNode = new ISLCGridNode(
        coulombsLawModel.snapObjectsToNearest,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' } );
      this.addChild( gridNode );
    }
  }
}

coulombsLaw.register( 'CoulombsLawCommonView', CoulombsLawCommonView );
export default CoulombsLawCommonView;