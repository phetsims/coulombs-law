// Copyright 2017-2019, University of Colorado Boulder

/**
 * Class for Macro subscreen. Adds charge, ruler, and legend elements and creates the necessary scale factor for proper
 * model/view consistency.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  const CoulombsLawCommonView = require( 'COULOMBS_LAW/common/view/CoulombsLawCommonView' );
  const CoulombsLawForceDescriber = require( 'COULOMBS_LAW/common/view/describers/CoulombsLawForceDescriber' );
  const CoulombsLawPositionDescriber = require( 'COULOMBS_LAW/common/view/describers/CoulombsLawPositionDescriber' );
  const DefaultDirection = require( 'INVERSE_SQUARE_LAW_COMMON/view/DefaultDirection' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );

  // strings
  const charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  const charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  const unitsMacroLegendScaleString = require( 'string!COULOMBS_LAW/units.macroLegendScale' );

  const unitsMicrocoulombsString = require( 'string!COULOMBS_LAW/units.microcoulombs' );

  // constants
  const SCALE_FACTOR = 1E6;  // number of microcoulombs in one C
  const MODEL_VIEW_TRANSFORM_SCALE = 5000;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroView( coulombsLawModel, tandem ) {

    const rulerOptions = {
      snapToNearest: 0.001  // in model coordinates
    };

    const positionDescriber = new CoulombsLawPositionDescriber( coulombsLawModel, 'label1', 'label2' );
    const forceDescriber = new CoulombsLawForceDescriber( coulombsLawModel, 'label1', 'label2', positionDescriber );
    const alertManager = new ISLCAlertManager( coulombsLawModel, forceDescriber );

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsMicrocoulombsString, MODEL_VIEW_TRANSFORM_SCALE, rulerOptions, tandem );

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
        fill: CoulombsLawColorProfile.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        left: this.layoutBounds.minX + 9.35,
        tandem: tandem.createTandem( 'legendNode' )
      } );

    this.addChild( legendNode );

    // a11y - charges are first in accessible order, followed by control panel in supertype
    const charges = [ chargeNode1, chargeNode2 ];
    this.pdomPlayAreaNode.accessibleOrder = charges.concat( this.pdomPlayAreaNode.accessibleOrder );
  }

  coulombsLaw.register( 'CoulombsLawMacroView', CoulombsLawMacroView );

  return inherit( CoulombsLawCommonView, CoulombsLawMacroView );
} );