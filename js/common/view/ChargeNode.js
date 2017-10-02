// Copyright 2017, University of Colorado Boulder

/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RangeWithValue = require('DOT/RangeWithValue'); 
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var ISLCObjectNode = require('INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode');

  // constants
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );

  /**
   * @param {CoulombsLawbModel} model
   * @param {ChargeModel} chargeModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, tandem, options ) {

    var forceConstant = ISLCConstants.k;

    options = _.extend( {
      label: 'This Charge',
      otherObjectName: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest,
      maxArrowWidth: 50,
      displayShadow: false,
      attractNegative: true,
      forceReadoutDecimalPlaces: 9,

      // colors for projector and default modes
      labelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
      arrowLabelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
      arrowFill: CoulombsLawColorProfile.forceArrowFillProperty,
      arrowStroke: CoulombsLawColorProfile.forceArrowStrokeProperty,
      labelShadowFill: CoulombsLawColorProfile.labelShadowFillProperty
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = chargeObjectModel;
    this.layoutBounds = layoutBounds;

    // for incrementing the radius to prevent division by zero in RadialGradient
    this.snapToNearest = options.snapToNearest;

    var maxForce = forceConstant * Math.pow( chargeObjectModel.valueRange.max, 2 ) / Math.pow( ( chargeObjectModel.radiusProperty.get() * 2 ), 2 );
    var minForce = -maxForce;

    // functions that determine scaling of the arrow readout and the corrent image to represent
    var pullForceRange = new RangeWithValue( minForce, maxForce ); // empirically determined for linear mapping of pull objects
    
    ISLCObjectNode.call( this, model, chargeObjectModel, layoutBounds, modelViewTransform, pullForceRange, tandem.createTandem( 'chargeNode1' ), options );

    this.model.scientificNotationProperty.lazyLink( this.redrawForce.bind( this ) );

    this.objectCircle.stroke = 'black';
    this.objectCircle.lineWidth = 0.5;
  }

  coulombsLaw.register( 'ChargeNode', ChargeNode );

  return inherit( ISLCObjectNode, ChargeNode, {

    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      // if the radius = 1, radial gradient will throw an divide-by-zero error
      // ensure inequality
      radius = radius === 1 ? radius + this.snapToNearest : radius;

      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }, 
    redrawForce: function () {
      this.arrowNode.scientificNotationMode = this.model.scientificNotationProperty.get();
      ISLCObjectNode.prototype.redrawForce.call( this );      
    }
  } );
} );
