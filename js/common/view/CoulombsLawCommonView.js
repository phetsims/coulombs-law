// Copyright 2017-2019, University of Colorado Boulder

/**
 * Parent screen view that allows for different model to view scaling for each child sim. Adds controls, checkboxes, and
 * reset buttons to the screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Sam Reid Î(PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const ChargeControl = require( 'COULOMBS_LAW/common/view/ChargeControl' );
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Vector2 = require( 'DOT/Vector2' );
  const ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );

  // strings
  const charge1String = require( 'string!COULOMBS_LAW/charge1' );
  const charge2String = require( 'string!COULOMBS_LAW/charge2' );
  const forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  const scientificNotationString = require( 'string!COULOMBS_LAW/scientificNotation' );

  // constants
  const SHOW_GRID = ISLCQueryParameters.showGrid;

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

    // create and add macro ruler
    const coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'ruler' ),
      _.pick( options, [
        'snapToNearest',
        'majorTickLabels',
        'unitString',
        'rulerInset',
        'moveOnHoldDelay',
        'moveOnHoldInterval'
      ] ) );
    this.addChild( coulombsLawRuler );

    // construct checkbox item list
    const checkboxItems = [
      {
        label: forceValuesString,
        property: coulombsLawModel.showForceValuesProperty,
        tandem: tandem.createTandem( 'forceValuesCheckbox' )
      },
      {
        label: scientificNotationString,
        property: coulombsLawModel.scientificNotationProperty,
        options: { enabledProperty: coulombsLawModel.showForceValuesProperty }, // force values toggles this enabled
        tandem: tandem.createTandem( 'scientificNotationCheckbox' )
      }
    ];

    const coulombsLawParameterCheckbox = new ISLCCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'coulombsLawParameterCheckbox' ),
      fill: '#EDEDED',
      right: rightAlignment,
      bottom: bottomAlignment - 73
    } );

    this.addChild( coulombsLawParameterCheckbox );

    const charge1Control = new ChargeControl(
      charge1String,
      unitString,
      coulombsLawModel.object1.valueProperty,
      coulombsLawModel.object1.valueRange,
      scaleFactor,
      { tandem: tandem.createTandem( 'charge1Control' ) }
    );
    charge1Control.right = this.layoutBounds.centerX - 5;
    charge1Control.top = coulombsLawParameterCheckbox.top;

    this.addChild( charge1Control );

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
    charge2Control.top = coulombsLawParameterCheckbox.top;

    this.addChild( charge2Control );

    // Reset All button
    // buttons are never disposed in this sim
    const resetAllButton = new ResetAllButton( {
      listener: function() {
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
    this.addChild( resetAllButton );

    // a11y - accessible order of controls, charge objects will come first in subtypes
    this.playAreaNode.accessibleOrder = [
      coulombsLawRuler,
      charge1Control,
      charge2Control,
      coulombsLawParameterCheckbox,
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

  coulombsLaw.register( 'CoulombsLawCommonView', CoulombsLawCommonView );

  return inherit( ScreenView, CoulombsLawCommonView );
} );
