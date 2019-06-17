// Copyright 2017-2019, University of Colorado Boulder

/**
 * Scenery node for the charge object. Children include the pusher/pullers, the circular charge, the force arrow, and
 * all labels. Most instantiation details are handled in ISLCObjectNode including all Property linking and drawing.
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
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var CHARGE_NODE_Y_POSITION = 205;

  /**
   * @param {CoulombsLawCommonModel} model
   * @param {Charge} chargeObjectModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ISLCAlertManager} alertManager
   * @param {PositionDescriber} positionDescriber
   * @param {Object} options
   * @constructor
   */
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, alertManager, positionDescriber, options ) {

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

      tandem: Tandem.required,
      // TODO: proper sting usage
      a11yCreateValueChangeAriaValueText: function( formattedValue ) {
        return '{{formattedValue}} coulombs';
      }
    }, options );

    // @private - Used for incrementing the radius to prevent division by zero in RadialGradient
    this.snapToNearest = options.snapToNearest;

    ISLCObjectNode.call(
      this,
      model,
      chargeObjectModel,
      layoutBounds,
      modelViewTransform,
      alertManager,
      positionDescriber,
      options
    );

    // scientific notation property is never removed/destroyed, no disposal required
    model.scientificNotationProperty.lazyLink( this.redrawForce.bind( this ) );

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
    redrawForce: function() {
      this.arrowNode.scientificNotationMode = this.model.scientificNotationProperty.get();
      ISLCObjectNode.prototype.redrawForce.call( this );
    }
  } );
} );
