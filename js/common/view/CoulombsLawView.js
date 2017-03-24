// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode');
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );


  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );

  // constants
  var CHARGE_NODE_Y_POSITION = 300;

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawView( coulombsLawModel, tandem ) {

    ScreenView.call( this );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        coulombsLawModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      50
    );

    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      modelViewTransform, 
      tandem.createTandem( 'chargeNode1' ), 
      {
        label: charge1AbbreviatedString,
        otherObjectLabel: charge2AbbreviatedString,
        direction: 'left',
        arrowColor: '#66f',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 125
      } );
    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      modelViewTransform, 
      tandem.createTandem( 'chargeNode2' ), 
      {
        label: charge2AbbreviatedString,
        otherObjectLabel: charge1AbbreviatedString,
        direction: 'right',
        arrowColor: '#f66',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 125
      } );
    this.addChild( chargeNode1 );
    this.addChild( chargeNode2 );

  }

  coulombsLaw.register( 'CoulombsLawView', CoulombsLawView );

  return inherit( ScreenView, CoulombsLawView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );