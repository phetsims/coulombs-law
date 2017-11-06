// Copyright 2017, University of Colorado Boulder

/**
 * Model for one of the spherical draggable charges.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCObject' );
  var Property = require( 'AXON/Property' );
  var TColor = require( 'SCENERY/util/TColor' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @param {number} initialCharge
   * @param {number} initialPosition
   * @param {string} baseColor
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Charge( initialCharge, initialPosition, valueRange, baseColor, tandem, options ) {

    options = _.extend( {
      constantRadius: 6.75E-3 // ensure this is in meters (0.675cm)
    }, options );

    var constantRadiusProperty = new Property( true, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    });

    var negativeColor = new Color( '#00f' );
    var positiveColor = new Color( '#f00' );

    ISLCObject.call( this, initialCharge, initialPosition, valueRange, constantRadiusProperty, tandem, options );

    // @public - object node color is will change with value
    // color property will be updated based on a boolean value (negative vs positive)
    // brightness will be set according to the Mass/Charge magnitude
    this.baseColorProperty = new DerivedProperty(
      [ this.valueProperty ],
      function( value ) {
        var newBaseColor = value < 0 ? negativeColor : positiveColor;
        return newBaseColor.colorUtilsBrighter( 1 - Math.abs(value) / valueRange.max );
      },
      { tandem: tandem.createTandem( 'baseColorProperty' ), phetioValueType: TColor }
    );
  }

  coulombsLaw.register( 'Charge', Charge );

  return inherit( ISLCObject, Charge, {

    /**
     * @override
     */
    calculateRadius: function( charge ) {
      return this.radiusProperty.get();
    },

    // @public
    reset: function() {
      this.valueProperty.reset();
      this.positionProperty.reset();
    }
  } );
} );