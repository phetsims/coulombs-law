// Copyright 2017-2019, University of Colorado Boulder

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
    var ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
    var NumberProperty = require( 'AXON/NumberProperty' );
    var PhetFont = require( 'SCENERY_PHET/PhetFont' );
    var Range = require( 'DOT/Range' );
    var Tandem = require( 'TANDEM/Tandem' );

    // constants
    var TRACK_SIZE = new Dimension2( 132, 0.25 );
    var THUMB_SIZE = new Dimension2( 10, 18 );

    /**
     * @param {string} titleString
     * @param {string} unitString - for the NumberControl readout
     * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
     * @param {Range} valueRange - max and min values for the object Property, used for display and as NumberControl argument
     * @param {number} scaleFactor - multiplicative constant for getting proper readouts/positions on Macro and Atomic screens
     * @param {Object} options
     * @constructor
     */
    function ChargeControl( titleString, unitString, objectProperty, valueRange, scaleFactor, options ) {

      options = _.extend( {

        // panel options
        align: 'center',
        additionalTicks: [ { value: 0, tandemLabel: 'majorTickZeroLabel' } ],

        numberControlOptions: {
          sliderOptions: {
            thumbSize: THUMB_SIZE,
            trackSize: TRACK_SIZE
          },
          titleNodeOptions: { font: new PhetFont( 16 ) },
          numberDisplayOptions: {
            font: new PhetFont( 12 ),
            xMargin: 4,
            yMargin: 2
          },
          arrowButtonOptions: {
            scale: 0.5
          }
        },

        tandem: Tandem.required
      }, options );

      // @public {Property.<number>} - intermediate Property to allow for scaling between atomic units and microcoulombs
      //  - value ranges from -10 to 10
      //  - unit can be e or mc
      this.chargeControlProperty = new NumberProperty( objectProperty.get() * scaleFactor, { range: new Range( -10, 10 ) } );

      // no unlinking/disposing required as Property is never destroyed
      this.chargeControlProperty.link( function( value ) {
        objectProperty.set( value / scaleFactor );
      } );

      var chargeControlRange = new Range( valueRange.min * scaleFactor, valueRange.max * scaleFactor );

      // add custom thumb to the slider
      options.numberControlOptions.sliderOptions.thumbNode = new ChargeControlSliderThumb( objectProperty, _.extend( {}, options,
        { tandem: options.tandem.createTandem( 'chargeControlsSliderThumb' ) } ) );

      ISLCObjectControlPanel.call( this, titleString, unitString, this.chargeControlProperty, chargeControlRange, options );
    }

    coulombsLaw.register( 'ChargeControl', ChargeControl );

    return inherit( ISLCObjectControlPanel, ChargeControl, {

      // @public
      reset: function() {
        this.chargeControlProperty.reset();
      }
    } );
  }
);