// Copyright 2013-2015, University of Colorado Boulder

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
  var ObjectControl = require('INVERSE_SQUARE_LAW_COMMON/view/ObjectControl');
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // constants
  var TRACK_SIZE = new Dimension2( 132, 0.25 );
  var THUMB_SIZE = new Dimension2( 10, 18 );

  /**
   * @param {string} titleString
   * @param {Property.<number>} objectProperty
   * @param {Range} valueRange
   * @param {Color} thumbColor
   * @param {Tandem} tandem
   * @constructor
   */
  function ChargeControl( titleString, unitString, objectProperty, valueRange, scaleFactor, tandem, options ) {

    options = _.extend( {
      align: 'center',
      // maxWidth: 275,
      // minWidth: 275,
      // maxHeight: 89,
      arrowButtonScale: 0.5,
      thumbSize: THUMB_SIZE,
      trackSize: TRACK_SIZE,
      titleFontSize: 16,
      valueFontSize: 12,
      valueXMargin: 4,
      valueYMargin: 2,
      additionalTicks: [{value: 0, tandemLabel: 'majorTickZeroLabel'}]
    }, options );

    // create intermediate property
    // scales between C and nC or e

    // varies between -10 and 10
    this.chargeControlProperty = new Property( objectProperty.get() * scaleFactor );

    this.chargeControlProperty.link( function( value ) {
      objectProperty.set( value / scaleFactor );
    } );


    var chargeControlRange = new Range( valueRange.min * scaleFactor, valueRange.max * scaleFactor );

    options.thumbNode = new ChargeControlSliderThumb( objectProperty, options );

    ObjectControl.call(this, titleString, unitString, this.chargeControlProperty, chargeControlRange, tandem, options );
  }

  coulombsLaw.register( 'ChargeControl', ChargeControl );

  return inherit( ObjectControl, ChargeControl, {
    reset: function() {
      this.chargeControlProperty.reset();
    }
  } );
} );