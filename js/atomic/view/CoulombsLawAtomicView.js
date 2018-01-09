// Copyright 2017-2018, University of Colorado Boulder

/**
 * Atomic scale specific screen view. Adds charge, ruler, and legend nodes that all require scale-specific instantiation.
 * Also creates the proper model/view scaling.
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode');
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var CoulombsLawCommonView = require( 'COULOMBS_LAW/common/view/CoulombsLawCommonView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  var pmScaleString = require( 'string!COULOMBS_LAW/pmScale' );
  var unitsAtomicLegendScaleString = require( 'string!COULOMBS_LAW/units.atomicLegendScale' );
  var unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits');
  var unitsPicometersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.picometers' );

  // constants
  var SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5E12; // scales the modelViewTransorm for accurate positioning on Macro and Atomic screens
  var ARROW_MAX_WIDTH = 500;
  var PULL_RANGE_MULTIPLIER = 1 / 10;

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

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, MODEL_VIEW_TRANSFORM_SCALE, rulerOptions, tandem );

    // charge nodes added in each screen to allow for different decimal precision and arrow height
    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode1' ), 
      {
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        forceArrowHeight: 70,
        atomicScale: true,
        maxArrowWidth: ARROW_MAX_WIDTH,
        pullRangeMultiplier: PULL_RANGE_MULTIPLIER
      } );

    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode2' ), 
      {
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        forceArrowHeight: 120,
        atomicScale: true,
        maxArrowWidth: ARROW_MAX_WIDTH,
        pullRangeMultiplier: PULL_RANGE_MULTIPLIER
      } );

    this.insertChild( 0, chargeNode1 );
    this.insertChild( 0, chargeNode2 );

    // the arrows and their labels should be above both charges (and their markers) but below
    // the ruler and control panels
    this.insertChild( 1, chargeNode1.arrowNode );
    this.insertChild( 1, chargeNode2.arrowNode );

    // @public (read-only) - create and add atomic ruler
    // this.coulombsLawRuler = new ISLCRulerNode(
    //   coulombsLawModel,
    //   this.layoutBounds.height,
    //   this.modelViewTransform,
    //   tandem.createTandem( 'coulombsLawRuler' ),
    //   {
    //     snapToNearest: 1E-12, // in model coordinates
    //     majorTickLabels: [ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
    //     unitString: unitsPicometersString,
    //     rulerInset: 15
    //   }
    // );
    // this.addChild( this.coulombsLawRuler );

    // create a line the length of 1 picometer
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 10E-12 );

    var legendNode = new ISLCLegendNode( 
      legendNodeLineLength, // length of the line
      unitsAtomicLegendScaleString, // unit string
      {
        fill: CoulombsLawColorProfile.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'atomicLegendNode' ) 
      } );

    legendNode.left = this.layoutBounds.minX + 9.35;

    this.addChild( legendNode );

    // add picometer conversion string
    var pmScaleFont = new PhetFont( 12 );
    var picometerScaleNode = new RichText( pmScaleString, {
      fill: CoulombsLawColorProfile.legendNodeFillProperty,
      font: pmScaleFont,
      maxWidth: 180,
      bottom: this.layoutBounds.maxY - 8,
      tandem: tandem.createTandem( 'picometerScaleString' )
    } );

    picometerScaleNode.left = legendNode.right + 10;

    this.addChild( picometerScaleNode );

    // a11y - charges are first in focus order
    var charges = [ chargeNode1, chargeNode2 ];
    this.accessibleOrder = charges.concat( this.accessibleOrder );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );