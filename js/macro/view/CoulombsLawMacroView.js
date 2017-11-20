// Copyright 2017, University of Colorado Boulder

/**
 * Class for Macro subscreen. Adds charge, ruler, and legend elements and creates the necessary scale factor for proper
 * model/view consistency.
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
  var ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );

  // strings
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var unitsMacroLegendScaleString = require( 'string!COULOMBS_LAW/units.macroLegendScale' );
  var unitsMicrocoulombsString = require( 'string!COULOMBS_LAW/units.microcoulombs' );

  // constants
  var CHARGE_NODE_Y_POSITION = 205;
  var SCALE_FACTOR = 1E6;  // number of microcoulombs in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5000;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawMacroView( coulombsLawModel, tandem ) {

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsMicrocoulombsString, MODEL_VIEW_TRANSFORM_SCALE, tandem );

    // charge nodes added in each screen to allow for different decimal precision
    // and arrow height
    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode1' ), 
      {
        title: charge1String,
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 105
      } );

    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode2' ), 
      {
        title: charge2String,
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 165
      } );

    this.addChild( chargeNode1 );
    this.addChild( chargeNode2 );

    // the arrows and their labels should be above both charges (and their markers) but below
    // the ruler and control panels
    this.addChild( chargeNode1.arrowNode );
    this.addChild( chargeNode2.arrowNode );

    // create and add macro ruler
    var coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      {
        snapToNearest: 0.001 // in model coordinates
      }
    );

    this.addChild( coulombsLawRuler );

    // create a line the length of 1 cm
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 1E-2 );

    var legendNode = new ISLCLegendNode( 
      legendNodeLineLength, // length of the line
      unitsMacroLegendScaleString, // unit string
      {
        fill: CoulombsLawColorProfile.legendNodeFillProperty,
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'legendNode' ) 
      } );


    legendNode.left = this.layoutBounds.minX + 9.35;

    this.addChild( legendNode );

    // a11y - charges are first in accessible order, followed by control panel in supertype
    var charges = [ chargeNode1, chargeNode2 ];
    this.accessibleOrder = charges.concat( this.accessibleOrder );
  }

  coulombsLaw.register( 'CoulombsLawMacroView', CoulombsLawMacroView );

  return inherit( CoulombsLawCommonView, CoulombsLawMacroView );
} );