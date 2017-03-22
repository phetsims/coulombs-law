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
  // var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PullerPusherNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/PullerPusherNode' );
  var ISLForceArrowNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLForceArrowNode' );
  var RangeWithValue = require('DOT/RangeWithValue'); 
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var ObjectNode = require('INVERSE_SQUARE_LAW_COMMON/view/ObjectNode');

  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );

  /**
   * @param {CoulombsLawbModel} model
   * @param {ChargeModel} massModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ChargeNode( model, chargeObjectModel, layoutBounds, modelViewTransform, tandem, options ) {

    options = _.extend( {
      label: 'This Charge',
      otherMassName: 'Other Charge',
      direction: 'left', //direction mass
      arrowColor: '#66f', //color vertical line
      y: 250,
      forceArrowHeight: 150, // arrow height
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout
      snapToNearest: null // {number} if present, charge node will snap to the nearest snapToNearest on drag
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;

    // @private
    this.objectModel = chargeObjectModel;

    // the puller/pusher robots
    // functions that determine scaling of the arrow readout and the corrent image to represent
    var pullForceRange = new RangeWithValue( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects

    // the puller/pusher robot    
    var pullerPusherNode = new PullerPusherNode( pullForceRange, tandem.createTandem( 'puller1' ) );

    // the arrow node, scaled by model ranges and values
    var arrowForceRange = new RangeWithValue( ( 6.0e-9 ), ( 4.1e-6 ) ); // empirically determined for linear mapping of pull objects
    var forceArrowNode = new ISLForceArrowNode( charge1String, arrowForceRange, layoutBounds, tandem.createTandem( 'forceArrowNode' ) );
    
    ObjectNode.call( this, model, chargeObjectModel, layoutBounds, modelViewTransform, pullerPusherNode, forceArrowNode, tandem.createTandem( 'chargeNode1' ), {
      label: charge1String,
      otherObjectName: charge2String
    } );
  }

  coulombsLaw.register( 'ChargeNode', ChargeNode );

  // TODO: Inherit from InverseSquareObjectNode
  return inherit( ObjectNode, ChargeNode, {

    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }
  } );
} );
