// Copyright 2017-2018, University of Colorado Boulder

/**
 * Scenery node for the charge object. Children include the pusher/pullers, the circular charge, the force arrow, and
 * all labels. Most instantiation details are handled in ISLCObjectNode including all property linking and drawing.
 // REVIEW: Use Property instead of property in above comment
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 *
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
  var CHARGE_NODE_Y_POSITION = 205;

  /**
   * @param {CoulombsLawbModel} model
   * @param {Charge} chargeObjectModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem // TODO: move to options // REVIEW: Handle todo
   * @param {Object} options
   * @constructor
   */
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, tandem, options ) {

    var forceConstant = ISLCConstants.k;

    options = _.extend( {
      label: 'This Charge',
      otherObjectLabel: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest,
      maxArrowWidth: 50,
      displayShadow: false,
      attractNegative: true,
      forceReadoutDecimalPlaces: 9,
      y: CHARGE_NODE_Y_POSITION,
      pullRangeMultiplier: 1,

      // colors for projector and default modes
      labelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
      arrowLabelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
      arrowFill: CoulombsLawColorProfile.forceArrowFillProperty,
      arrowStroke: CoulombsLawColorProfile.forceArrowStrokeProperty,
      labelShadowFill: CoulombsLawColorProfile.labelShadowFillProperty,

      tandem: tandem.createTandem( 'chargeNode1' )
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = chargeObjectModel;
    this.layoutBounds = layoutBounds;

    // @private - Used for incrementing the radius to prevent division by zero in RadialGradient
    this.snapToNearest = options.snapToNearest;

    // inherited object node accepts the entire force range. (NOTE: necessary to calculate here as Coulomb's Law allows
    // negative forces while Gravity Force Lab does not.)
    var maxForce = forceConstant * Math.pow( chargeObjectModel.valueRange.max, 2 ) / Math.pow( ( chargeObjectModel.radiusProperty.get() * 2 ), 2 );
    maxForce = maxForce * options.pullRangeMultiplier;
    var minForce = -maxForce;

    // function that determines the current puller image to represent
    var pullForceRange = new RangeWithValue( minForce, maxForce );
    
    ISLCObjectNode.call( 
      this,
      model,
      chargeObjectModel,
      layoutBounds,
      modelViewTransform,
      pullForceRange,
      options
    );

    // scientific notation property is never removed/destroyed, no disposal required
    this.model.scientificNotationProperty.lazyLink( this.redrawForce.bind( this ) );

    // stroke added here for projector mode and white bg printing options
    this.objectCircle.stroke = 'black';
    this.objectCircle.lineWidth = 0.5;
  }

  coulombsLaw.register( 'ChargeNode', ChargeNode );

  return inherit( ISLCObjectNode, ChargeNode, {

    /**
     * Alter the radial gradient based on the radius of the charge object
     * @param  {Color} baseColor
     */
    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );

      // if the radius = 1, radial gradient will throw an divide-by-zero error
      // ensure inequality
      radius = radius === 1 ? radius + this.snapToNearest : radius;

      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    },

    /**
     * Updates the node's arrow length, force readout, and puller image.
     */
    redrawForce: function () {
      this.arrowNode.scientificNotationMode = this.model.scientificNotationProperty.get();
      ISLCObjectNode.prototype.redrawForce.call( this );
    }
  } );
} );
