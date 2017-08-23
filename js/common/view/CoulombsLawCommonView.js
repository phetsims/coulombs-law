// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var CoulombsLawQueryParameters = require( 'COULOMBS_LAW/common/CoulombsLawQueryParameters' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var ISLCheckboxPanel = require ('INVERSE_SQUARE_LAW_COMMON/view/ISLCheckboxPanel' );
  var Property = require( 'AXON/Property' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode');
  var ChargeControl = require( 'COULOMBS_LAW/common/view/ChargeControl' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var InverseSquareLawGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/InverseSquareLawGridNode' );
  var ISLQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLQueryParameters' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );

  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  var showValuesString = require( 'string!COULOMBS_LAW/showValues' );
  var scientificNotationString = require( 'string!COULOMBS_LAW/scientificNotation' );

  // constants
  var CHARGE_NODE_Y_POSITION = 218;
  var MOCKUP = CoulombsLawQueryParameters.mockup;
  var SHOW_GRID = ISLQueryParameters.showGrid;

  // images
  var backgroundImage = require( 'image!COULOMBS_LAW/image06.png' );

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawCommonView( coulombsLawModel, scaleFactor, unitString, arrowForceRange, modelViewTransformScale, tandem ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) }  );

    var rightAlignment = this.layoutBounds.maxX - 10;
    var bottomAlignment = this.layoutBounds.maxY - 10;

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      modelViewTransformScale
    );

    this.modelViewTransform = modelViewTransform;

    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      modelViewTransform,
      arrowForceRange,
      tandem.createTandem( 'chargeNode1' ), 
      {
        title: charge1String,
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 125,
        attractNegative: true
      } );

    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      modelViewTransform,
      arrowForceRange,
      tandem.createTandem( 'chargeNode2' ), 
      {
        title: charge2String,
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 175,
        attractNegative: true
      } );

    this.addChild( chargeNode1 );
    this.addChild( chargeNode2 );

    // the arrows and their labels should be above both charges (and their markers) but below
    // the ruler and control panels
    this.addChild( chargeNode1.arrowNode );
    this.addChild( chargeNode2.arrowNode );

    var coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      {
        snapToNearest: 0.1 // in model coordinates
      }
    );

    // construct checkbox parameter lists

    var checkboxParameters = [];

    checkboxParameters.push({
      content: showValuesString,
      property: coulombsLawModel.showValuesProperty,
      textTandemLabel: 'showValuesText',      // tandem for the label
      checkboxTandemLabel: 'showValuesCheckbox'    // tande name for checkbox node (see VerticalCheckboxGroup)
    });

    checkboxParameters.push({
      content: scientificNotationString,
      property: coulombsLawModel.scientificNotationProperty,
      textTandemLabel: 'scientificNotationText',
      checkboxTandemLabel: 'scientificNotationCheckbox'
    });

    var coulombsLawParameterCheckbox = new ISLCheckboxPanel( checkboxParameters,
                                                             tandem.createTandem( 'coulombsLawParameterCheckbox' ),
                                                             {
                                                              fill: '#EDEDED',
                                                              right: rightAlignment,
                                                              bottom: bottomAlignment - 73
                                                             } );

    this.addChild( coulombsLawParameterCheckbox );

    this.addChild( coulombsLawRuler );

    var charge1Control = new ChargeControl(
      charge1String,
      unitString,
      coulombsLawModel.object1.valueProperty,
      coulombsLawModel.object1.valueRange,
      scaleFactor,
      tandem.createTandem( 'charge2Control' ),
      {
        right: rightAlignment - 387,
        top: coulombsLawParameterCheckbox.top
      }
    );

    this.addChild( charge1Control );

    var charge2Control = new ChargeControl(
      charge2String,
      unitString,
      coulombsLawModel.object2.valueProperty,
      coulombsLawModel.object2.valueRange,
      scaleFactor,
      tandem.createTandem( 'charge2Control' ),
      {
        right: rightAlignment - 193,
        top: coulombsLawParameterCheckbox.top
      }
    );

    this.addChild( charge2Control );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        coulombsLawModel.reset();
        charge1Control.reset();
        charge2Control.reset();
      },
      radius: 18,
      right:  rightAlignment,
      bottom: bottomAlignment
    } );
    this.addChild( resetAllButton );

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( MOCKUP ) {
      //Show the mock-up and a slider to change its transparency
      var mockupOpacityProperty = new Property( 0.00 );
      var mockImage = new Image( backgroundImage, { pickable: false } );
      mockImage.scale( this.layoutBounds.width / mockImage.width, this.layoutBounds.height / mockImage.height );
      mockupOpacityProperty.linkAttribute( mockImage, 'opacity' );
      this.addChild( mockImage );
      this.addChild( new HSlider( mockupOpacityProperty, { min: 0, max: 1 }, { top: 10, left: 10 } ) );
    }

    if ( SHOW_GRID ) {
      var gridNode = new InverseSquareLawGridNode( 7.8, -7.8, 0.1, this.layoutBounds, modelViewTransform, {
        stroke: 'rgba( 250, 100, 100, 0.6 )'
      } );
      this.addChild( gridNode );
    }
  }

  coulombsLaw.register( 'CoulombsLawCommonView', CoulombsLawCommonView );

  return inherit( ScreenView, CoulombsLawCommonView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );