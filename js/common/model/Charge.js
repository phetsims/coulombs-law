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
  var ColorIO = require( 'SCENERY/util/ColorIO' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCObject' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );

  // phet-io modules
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );

  /**
   * @param {number} initialCharge
   * @param {number} initialPosition - only for the x coordinate
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Charge( initialCharge, initialPosition, valueRange, tandem, options ) {

    options = _.extend( {
      constantRadius: 6.75E-3 // ensure this is in meters (0.675cm)
    }, options );

    var constantRadiusProperty = new Property( true, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioType: PropertyIO( BooleanIO )
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
      { tandem: tandem.createTandem( 'baseColorProperty' ), phetioType: DerivedPropertyIO( ColorIO ) }
    );
  }

  coulombsLaw.register( 'Charge', Charge );

  return inherit( ISLCObject, Charge, {

    // @override
    // Returns the {number} radius of the charge object
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