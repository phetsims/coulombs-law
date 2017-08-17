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
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var RangeWithValue = require('DOT/RangeWithValue'); 

  // strings
  var unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits');

  // constants
  var SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5E12;
  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawAtomicView( coulombsLawModel, tandem ) {

     // the arrow node, scaled by model ranges and values
    var arrowForceRange = new RangeWithValue( ( 7.7e-11 ), ( 7.5e-7 ) ); // empirically determined for linear mapping of pull objects

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, arrowForceRange, MODEL_VIEW_TRANSFORM_SCALE, tandem );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );