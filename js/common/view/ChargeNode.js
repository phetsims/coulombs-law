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
  var ObjectNode = require('INVERSE_SQUARE_LAW_COMMON/view/ObjectNode');

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

    // @private
    this.objectModel = chargeObjectModel;

    var maxForce = forceConstant * chargeObjectModel.valueRange.max * chargeObjectModel.valueRange.max / 2;
    var minForce = -maxForce;

    // functions that determine scaling of the arrow readout and the corrent image to represent
    var pullForceRange = new RangeWithValue( minForce, maxForce ); // empirically determined for linear mapping of pull objects

    // the arrow node, scaled by model ranges and values
    var arrowForceRange = chargeArrowForceRange; // empirically determined for linear mapping of pull objects
    
    ObjectNode.call( this, model, chargeObjectModel, layoutBounds, modelViewTransform, pullForceRange, arrowForceRange, tandem.createTandem( 'chargeNode1' ), options );

    this.model.scientificNotationProperty.lazyLink( this.redrawForce.bind( this ) );
  }

  coulombsLaw.register( 'ChargeNode', ChargeNode );

  // TODO: Inherit from InverseSquareObjectNode
  return inherit( ObjectNode, ChargeNode, {

    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }, 
    redrawForce: function () {
      this.arrowNode.scientificNotationMode = this.model.scientificNotationProperty.get();
      ObjectNode.prototype.redrawForce.call( this );      
    }
  } );
} );
