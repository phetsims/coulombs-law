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

  // strings
  // var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  // var charge2String = require( 'string!COULOMBS_LAW/charge2' );

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

    options = _.extend( {
      label: 'This Charge',
      otherObjectName: 'Other Charge',
      scientificNotationMode: true,
      snapToNearest: model.snapObjectsToNearest
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;

    this.model = model;

    // @private
    this.objectModel = chargeObjectModel;

    // functions that determine scaling of the arrow readout and the corrent image to represent
    var pullForceRange = new RangeWithValue( ( -5e-7 ), ( 5e-7 ) ); // empirically determined for linear mapping of pull objects

    // the arrow node, scaled by model ranges and values
    var arrowForceRange = new RangeWithValue( ( 7.7e-11 ), ( 7.5e-7 ) ); // empirically determined for linear mapping of pull objects
    
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
