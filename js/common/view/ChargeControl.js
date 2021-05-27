// Copyright 2017-2021, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import ISLCObjectControlPanel from '../../../../inverse-square-law-common/js/view/ISLCObjectControlPanel.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Slider from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import coulombsLaw from '../../coulombsLaw.js';
import ChargeControlSliderThumb from './ChargeControlSliderThumb.js';

// constants
const TRACK_SIZE = new Dimension2( 132, 0.25 );

class ChargeControl extends ISLCObjectControlPanel {

  /**
   * @param {string} titleString
   * @param {string} unitString - for the NumberControl readout
   * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
   * @param {Range} valueRange - max and min values for the object Property, used for display and as NumberControl argument
   * @param {number} scaleFactor - multiplicative constant for getting proper readouts/positions on Macro and Atomic screens
   * @param {Object} [options]
   */
  constructor( titleString, unitString, objectProperty, valueRange, scaleFactor, options ) {

    options = merge( {

      // panel options
      align: 'center',
      additionalTicks: [ { value: 0 } ],

      numberControlOptions: {
        sliderOptions: {
          trackSize: TRACK_SIZE,

          // Instead of having a LinkedProperty to this.chargeControlProperty, link directly to the model Property.
          phetioLinkedProperty: objectProperty
        },
        titleNodeOptions: { font: new PhetFont( 16 ) },
        numberDisplayOptions: {
          textOptions: {
            font: new PhetFont( 12 )
          },
          xMargin: 4,
          yMargin: 2
        },
        arrowButtonOptions: {
          scale: 0.5
        }
      },

      tandem: Tandem.REQUIRED
    }, options );

    // {Property.<number>} - intermediate Property to allow for scaling between atomic units and microcoulombs
    //  - value ranges from -10 to 10
    //  - unit can be e or mc
    // TODO: make this DynamicProperty to support PhET-iO LinkedElement, or eliminate altogether
    const chargeControlProperty = new NumberProperty( objectProperty.get() * scaleFactor, {
      range: new Range( -10, 10 )
    } );

    // no unlinking/disposing required as Property is never destroyed
    chargeControlProperty.link( value => {
      objectProperty.set( value / scaleFactor );
    } );

    const chargeControlRange = new Range( valueRange.min * scaleFactor, valueRange.max * scaleFactor );

    // add custom thumb to the slider
    options.numberControlOptions.sliderOptions.thumbNode = new ChargeControlSliderThumb( objectProperty,
      merge( {}, options, {
        tandem: options.tandem.createTandem( ISLCObjectControlPanel.NUMBER_CONTROL_TANDEM_NAME )
          .createTandem( NumberControl.SLIDER_TANDEM_NAME ).createTandem( Slider.THUMB_NODE_TANDEM_NAME )
      } ) );

    super( titleString, unitString, chargeControlProperty, chargeControlRange, options );

    // @public
    this.chargeControlProperty = chargeControlProperty;
  }

  // @public
  reset() {
    this.chargeControlProperty.reset();
  }
}

coulombsLaw.register( 'ChargeControl', ChargeControl );
export default ChargeControl;