// Copyright 2017-2019, University of Colorado Boulder

/**
 * Scenery node for the charge object. Children include the pusher/pullers, the circular charge, the force arrow, and
 * all labels. Most instantiation details are handled in ISLCObjectNode including all Property linking and drawing.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 *
 */

define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  const merge = require( 'PHET_CORE/merge' );
  const RadialGradient = require( 'SCENERY/util/RadialGradient' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const CHARGE_NODE_Y_POSITION = 205;

  /**
   * @param {CoulombsLawCommonModel} model
   * @param {Charge} chargeObjectModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ISLCAlertManager} alertManager
   * @param {ForceDescriber} forceDescriber
   * @param {PositionDescriber} positionDescriber
   * @param {Object} options
   * @constructor
   */
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, alertManager,
                       forceDescriber, positionDescriber, options ) {

    options = merge( {
      label: 'This Charge', // TODO: factor out into strings files
      otherObjectLabel: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest,
      attractNegative: true,
      y: CHARGE_NODE_Y_POSITION,

      pullerNodeOptions: {
        displayShadow: false
      },

      arrowNodeOptions: {
        maxArrowWidth: 50,
        forceReadoutDecimalPlaces: 9,

        // colors for projector and default modes
        labelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
        arrowLabelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
        arrowFill: CoulombsLawColorProfile.forceArrowFillProperty,
        arrowStroke: CoulombsLawColorProfile.forceArrowStrokeProperty,
        labelShadowFill: CoulombsLawColorProfile.labelShadowFillProperty,
        backgroundFill: CoulombsLawColorProfile.backgroundProperty
      },
      labelOptions:{
        fill: CoulombsLawColorProfile.forceArrowLabelFillProperty
      },

      // phet-io
      tandem: Tandem.REQUIRED,

      // TODO: proper sting usage
      a11yCreateAriaValueText: function( formattedValue ) {
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
      forceDescriber,
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
      let radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );

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
