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
  var ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  var RangeWithValue = require('DOT/RangeWithValue'); 

  // strings
  var unitsNanocoulombsString = require( 'string!COULOMBS_LAW/units.nanocoulombs');

  // constants
  var SCALE_FACTOR = 1E9;  // number of nC in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 50;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawMacroView( coulombsLawModel, tandem ) {

    var forceArrowRange = new RangeWithValue( ( 7.7e-11 ), ( 7.5e-7 ) );

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsNanocoulombsString, forceArrowRange, MODEL_VIEW_TRANSFORM_SCALE, tandem );

    // create a line the length of 1 cm
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 1 );

    var legendNode = new ISLCLegendNode( 
      legendNodeLineLength, // length of the line
      '1 cm', // unit string
      {
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'legendNode' ) 
      } );


    legendNode.left = this.layoutBounds.minX + 10;

    this.addChild( legendNode );
  }

  coulombsLaw.register( 'CoulombsLawMacroView', CoulombsLawMacroView );

  return inherit( CoulombsLawCommonView, CoulombsLawMacroView );
} );