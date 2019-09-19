// Copyright 2017-2019, University of Colorado Boulder

/**
 * Atomic scale specific screen view. Adds charge, ruler, and legend nodes that all require scale-specific instantiation.
 * Also creates the proper model/view scaling.
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
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  const charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  const charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  const pmScaleString = require( 'string!COULOMBS_LAW/pmScale' );
  const unitsAtomicLegendScaleString = require( 'string!COULOMBS_LAW/units.atomicLegendScale' );
  const unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits' );
  const unitsPicometersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.picometers' );

  // constants
  var SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5E12; // scales the modelViewTransform for accurate positioning on Macro and Atomic screens
  var ARROW_MAX_WIDTH = 10000;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawAtomicView( coulombsLawModel, tandem ) {

    var rulerOptions = {
      snapToNearest: 1E-12, // in model coordinates
      majorTickLabels: [ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
      unitString: unitsPicometersString,
      rulerInset: 15
    };

    const positionDescriber = new CoulombsLawPositionDescriber( coulombsLawModel, 'label1', 'label2' );
    const forceDescriber = new CoulombsLawForceDescriber( coulombsLawModel, 'label1', 'label2', positionDescriber );
    const alertManager = new ISLCAlertManager( coulombsLawModel, forceDescriber );

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, MODEL_VIEW_TRANSFORM_SCALE, rulerOptions, tandem );

    // charge nodes added in each screen to allow for different decimal precision and arrow height
    var chargeNode1 = new ChargeNode(
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
        addLabelBackground: false,
        labelOptions: {
          fill: 'white'
        },
        arrowNodeOptions: {
          forceReadoutDecimalPlaces: 9,
          maxArrowWidth: ARROW_MAX_WIDTH
        },
        tandem: tandem.createTandem( 'chargeNode1' )
      } );

    var chargeNode2 = new ChargeNode(
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
        addLabelBackground: false,
        labelOptions: {
          fill: 'white'
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
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 10E-12 );

    var legendNode = new ISLCLegendNode(
      legendNodeLineLength, // length of the line
      unitsAtomicLegendScaleString, // unit string
      {
        fill: CoulombsLawColorProfile.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        left: this.layoutBounds.minX + 9.35,
        tandem: tandem.createTandem( 'atomicLegendNode' )
      } );

    this.addChild( legendNode );

    // add picometer conversion string
    var picometerScaleNode = new RichText( pmScaleString, {
      fill: CoulombsLawColorProfile.legendNodeFillProperty,
      font: new PhetFont( 12 ),
      maxWidth: 180,
      centerY: legendNode.localToParentPoint( legendNode.legendArrowLine.center ).y,
      left: legendNode.right + 10,
      tandem: tandem.createTandem( 'picometerScaleString' )
    } );

    this.addChild( picometerScaleNode );

    // a11y - charges are first in focus order
    var charges = [ chargeNode1, chargeNode2 ];

    // a11y - tab order for the screenview (Accessibility.js setter)
    this.playAreaNode.accessibleOrder = charges.concat( this.playAreaNode.accessibleOrder );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );