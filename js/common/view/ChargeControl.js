// Copyright 2017, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var ChargeControlSliderThumb = require( 'COULOMBS_LAW/common/view/ChargeControlSliderThumb' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectControl = require('INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControl');
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // constants
  var TRACK_SIZE = new Dimension2( 132, 0.25 );
  var THUMB_SIZE = new Dimension2( 10, 18 );

  /**
   * @param {string} titleString
   * @param {string} unitString - for the NumberControl readout
   * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
   * @param {Range} valueRange - max and min values for the object property, used for display and as NumberControl argument
   * @param {number} scaleFactor - multiplicative constant for getting proper readouts/positions on Macro and Atomic screens
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ChargeControl( titleString, unitString, objectProperty, valueRange, scaleFactor, tandem, options ) {

    options = _.extend( {
      align: 'center',
      arrowButtonScale: 0.5,
      thumbSize: THUMB_SIZE,
      trackSize: TRACK_SIZE,
      titleFontSize: 16,
      valueFontSize: 12,
      valueXMargin: 4,
      valueYMargin: 2,
      additionalTicks: [{value: 0, tandemLabel: 'majorTickZeroLabel'}]
    }, options );

    // @public
    // intermediate property to allow for scaling between atomic units and microcoulombs
    // value ranges from -10 to 10 and unit can be e or mc
    this.chargeControlProperty = new Property( objectProperty.get() * scaleFactor );

    // no unlinking/disposing required as property is never destroyed
    this.chargeControlProperty.link( function( value ) {
      objectProperty.set( value / scaleFactor );
    } );

    var chargeControlRange = new Range( valueRange.min * scaleFactor, valueRange.max * scaleFactor );

    // add custom thumb to the slider
    options.thumbNode = new ChargeControlSliderThumb( objectProperty, options );

    ISLCObjectControl.call(this, titleString, unitString, this.chargeControlProperty, chargeControlRange, tandem, options );
  }

  coulombsLaw.register( 'ChargeControl', ChargeControl );

  return inherit( ISLCObjectControl, ChargeControl, {
    // @public
    reset: function() {
      this.chargeControlProperty.reset();
    }
  } );
} );