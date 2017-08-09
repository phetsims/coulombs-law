// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonView = require( 'COULOMBS_LAW/common/view/CoulombsLawCommonView' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var RangeWithValue = require('DOT/RangeWithValue'); 

  // strings
  var unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits');

  // constants
  var SCALE_FACTOR = 1 / InverseSquareLawCommonConstants.coulombsPerAtomicUnit;  // number of e in one C
  var DISTANCE_SCALE_FACTOR = 1E-12;
  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawAtomicView( coulombsLawModel, tandem ) {

     // the arrow node, scaled by model ranges and values
    var arrowForceRange = new RangeWithValue( ( 4.7e-29 ), ( 1.5e-26 ) ); // empirically determined for linear mapping of pull objects

    var scaleOptions = {
      valueScale: SCALE_FACTOR,
      distanceScale: DISTANCE_SCALE_FACTOR
    };

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, arrowForceRange, tandem, scaleOptions );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );