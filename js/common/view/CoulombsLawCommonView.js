// Copyright 2017-2018, University of Colorado Boulder

/**
 * Parent screen view that allows for different model to view scaling for each child sim. Adds controls, checkboxes, and
 * reset buttons to the screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Sam Reid Î(PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var ChargeControl = require( 'COULOMBS_LAW/common/view/ChargeControl' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var scientificNotationString = require( 'string!COULOMBS_LAW/scientificNotation' );
  var showValuesString = require( 'string!COULOMBS_LAW/showValues' );

  // constants
  var SHOW_GRID = ISLCQueryParameters.showGrid;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {number} scaleFactor - multiplicative constant to distinguish between Macro and Atomic scales
   * @param {string} unitString
   * @param {number} modelViewTransformScale - allows for distinct layout scales between Macro and Atomic screens
   * @param {Object} options
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawCommonView( coulombsLawModel, scaleFactor, unitString, modelViewTransformScale, options, tandem ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    var self = this;

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

    // @private
    this.modelViewTransform = modelViewTransform;

    // @public (read-only) - create and add macro ruler
    this.coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      _.pick( options, [
        'snapToNearest',
        'majorTickLabels',
        'unitString',
        'rulerInset',
        'moveOnHoldDelay',
        'moveOnHoldInterval'
      ] ) );
    this.addChild( this.coulombsLawRuler );

    // construct checkbox item list
    var checkboxItems = [
      new ISLCCheckboxItem( showValuesString, coulombsLawModel.showValuesProperty, {
        tandem: tandem.createTandem( 'showValuesCheckbox' )
      } ),
      new ISLCCheckboxItem( scientificNotationString, coulombsLawModel.scientificNotationProperty, {
        tandem: tandem.createTandem( 'scientificNotationCheckbox' )
      } )
    ];

    var coulombsLawParameterCheckbox = new ISLCCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'coulombsLawParameterCheckbox' ),
      fill: '#EDEDED',
      right: rightAlignment,
      bottom: bottomAlignment - 73
    } );

    this.addChild( coulombsLawParameterCheckbox );

    var charge1Control = new ChargeControl(
      charge1String,
      unitString,
      coulombsLawModel.object1.valueProperty,
      coulombsLawModel.object1.valueRange,
      scaleFactor,
      tandem.createTandem( 'charge2Control' ),
      {
        right: self.layoutBounds.centerX - 5,
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
        left: self.layoutBounds.centerX + 5,
        top: coulombsLawParameterCheckbox.top
      }
    );

    this.addChild( charge2Control );

    // Reset All button
    // buttons are never disposed in this sim
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        coulombsLawModel.reset();
        charge1Control.reset();
        charge2Control.reset();
      },
      radius: 18,
      right: rightAlignment,
      bottom: bottomAlignment
    } );
    this.addChild( resetAllButton );

    // accessible order of controls, charge objects will come first in subtypes
    this.accessibleOrder = [
      this.coulombsLawRuler,
      charge1Control,
      charge2Control,
      coulombsLawParameterCheckbox,
      resetAllButton
    ];

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( SHOW_GRID ) {
      var gridNode = new ISLCGridNode(
        coulombsLawModel.snapObjectsToNearest,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' } );
      this.addChild( gridNode );
    }
  }

  coulombsLaw.register( 'CoulombsLawCommonView', CoulombsLawCommonView );

  return inherit( ScreenView, CoulombsLawCommonView );
} );
