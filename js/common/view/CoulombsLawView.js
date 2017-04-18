// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var CoulombsLawQueryParameters = require( 'COULOMBS_LAW/common/CoulombsLawQueryParameters' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ISLRuler = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLRuler' );
  var ISLCheckboxPanel = require ('INVERSE_SQUARE_LAW_COMMON/view/ISLCheckboxPanel' );
  var Property = require( 'AXON/Property' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode');
  var ChargeControl = require( 'COULOMBS_LAW/common/view/ChargeControl' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );


  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  var showValuesString = require( 'string!COULOMBS_LAW/showValues' );
  var scientificNotationString = require( 'string!COULOMBS_LAW/scientificNotation' );

  // constants
  var CHARGE_NODE_Y_POSITION = 225;
  var MOCKUP = CoulombsLawQueryParameters.mockup;
  var SLIDER_COLOR = new Color( 'indigo' );
  var UNIT_STRING = 'nC';

  // images
  var backgroundImage = require( 'image!COULOMBS_LAW/image06.png' );

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawView( coulombsLawModel, tandem ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) }  );

    var rightAlignment = this.layoutBounds.maxX - 10;
    var bottomAlignment = this.layoutBounds.maxY - 10;

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        coulombsLawModel.reset();
      },
      right:  rightAlignment,
      bottom: bottomAlignment
    } );
    this.addChild( resetAllButton );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      50
    );

    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      modelViewTransform, 
      tandem.createTandem( 'chargeNode1' ), 
      {
        title: charge1String,
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 125
      } );

    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      modelViewTransform, 
      tandem.createTandem( 'chargeNode2' ), 
      {
        title: charge2String,
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 175
      } );

    this.addChild( chargeNode1 );
    this.addChild( chargeNode2 );

    var charge1Control = new ChargeControl(
      charge1String,
      UNIT_STRING,
      coulombsLawModel.object1.valueProperty,
      coulombsLawModel.object1.valueRange,
      SLIDER_COLOR,
      tandem.createTandem( 'charge2Control' ),
      {
        right: rightAlignment - 400,
        bottom: bottomAlignment
      }
    );

    this.addChild( charge1Control );

    var charge2Control = new ChargeControl(
      charge2String,
      UNIT_STRING,
      coulombsLawModel.object2.valueProperty,
      coulombsLawModel.object2.valueRange,
      SLIDER_COLOR,
      tandem.createTandem( 'charge2Control' ),
      {
        right: rightAlignment - 200,
        bottom: bottomAlignment
      }
    );

    this.addChild( charge2Control );

    var coulombsLawRuler = new ISLRuler(
      coulombsLawModel,
      this.layoutBounds.width,
      this.layoutBounds.height,
      tandem.createTandem( 'coulombsLawRuler' )
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
                                                              right: rightAlignment,
                                                              bottom: bottomAlignment - 75
                                                             } );

    this.addChild( coulombsLawParameterCheckbox );

    this.addChild( coulombsLawRuler );

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
  }

  coulombsLaw.register( 'CoulombsLawView', CoulombsLawView );

  return inherit( ScreenView, CoulombsLawView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );