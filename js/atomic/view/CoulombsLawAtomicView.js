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
  var ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );

  // strings
  var unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits');
  var unitsPicometersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.picometers');

  // constants
  var SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5E12;
  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawAtomicView( coulombsLawModel, tandem ) {

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, MODEL_VIEW_TRANSFORM_SCALE, tandem );

    // create and add atomic ruler
    var coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      {
        snapToNearest: 1E-12, // in model coordinates
        majorTickLabels: [ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
        unitString: unitsPicometersString
      }
    );

    this.addChild( coulombsLawRuler );
    // create a line the length of 1 picometer
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 1E-12 );

    var legendNode = new ISLCLegendNode( 
      legendNodeLineLength, // length of the line
      '1 pm', // unit string
      {
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'legendNode' ) 
      } );

    legendNode.left = this.layoutBounds.minX + 10;

    this.addChild( legendNode );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );