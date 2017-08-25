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
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var RangeWithValue = require('DOT/RangeWithValue'); 

  // strings
  var unitsMicrocoulombsString = require( 'string!COULOMBS_LAW/units.microcoulombs');

  // constants
  var SCALE_FACTOR = 1E6;  // number of microcoulombs in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5000;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawMacroView( coulombsLawModel, tandem ) {

    var forceArrowRange = new RangeWithValue( ( 1e-4 ), ( 4.0e-1 ) );

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsMicrocoulombsString, forceArrowRange, MODEL_VIEW_TRANSFORM_SCALE, tandem );

    // create and add macro ruler
    var coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      {
        snapToNearest: 0.001 // in model coordinates
      }
    );

    this.addChild( coulombsLawRuler );

    // create a line the length of 1 cm
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 1E-2 );

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