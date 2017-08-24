// Copyright 2013-2015, University of Colorado Boulder

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
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, chargeArrowForceRange, tandem, options ) {

    var forceConstant = ISLCConstants.k;

    options = _.extend( {
      label: 'This Charge',
      otherObjectName: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest,
      displayShadow: false
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

    // the arrow node, scaled by model ranges and values
    var arrowForceRange = chargeArrowForceRange; // empirically determined for linear mapping of pull objects
    
    ISLCObjectNode.call( this, model, chargeObjectModel, layoutBounds, modelViewTransform, pullForceRange, arrowForceRange, tandem.createTandem( 'chargeNode1' ), options );

    this.model.scientificNotationProperty.lazyLink( this.redrawForce.bind( this ) );
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
