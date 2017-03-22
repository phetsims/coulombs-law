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
  // var LinearFunction = require('DOT/LinearFunction');
  var Node = require( 'SCENERY/nodes/Node' );
  // var RangeWithValue = require('DOT/RangeWithValue'); 
  // var ISObjectNode = require('INVERSE_SQUARE_LAW_COMMON/ObjectNode');

  // strings
  // TODO: use in Inverse square law (same between Gravity Force and Coulombs Law)
  // var forceDescriptionPatternTargetSourceString = require( 'string!COULOMBS_LAW/force-description-pattern-target_source' );
  // var forceDescriptionPatternTargetSourceValueString = require( 'string!COULOMBS_LAW/force-description-pattern-target_source_value' );

  // constants
  // var PULL_IMAGES_COUNT = 59; // maximum number of images
  // var forceRange = new RangeWithValue( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects
  // var arrowForceRange = new RangeWithValue( ( 6.0e-9 ), ( 4.1e-6 ) ); // empirically determined for linear mapping of pull objects

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
    // var self = this;
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

    // set local variables and constants

    // conversion functions
    // var forceToArrow = new LinearFunction( arrowForceRange.min, arrowForceRange.max, 1, 60, false );
    // var forceToArrowMin = new LinearFunction( 0, arrowForceRange.min, 0, 1, false );
    // var forceToImage = new LinearFunction( pullForceRange.min, pullForceRange.max, 0, PULL_IMAGES_COUNT - 1, true );

    // ISObjectNode.call( this, stuff );
  }

  coulombsLaw.register( 'ChargeNode', ChargeNode );

  // TODO: Inherit from InverseSquareObjectNode
  return inherit( Node, ChargeNode );
} );
