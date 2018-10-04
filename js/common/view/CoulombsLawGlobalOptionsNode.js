// Copyright 2017-2018, University of Colorado Boulder

/**
 * An options checkbox that can be accessed from the footer navigation. Links to global sim properties.
 * 
 * @author Michael Barlow (PhET Interactive Simulations)
 * 
 */
define( function ( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawGlobals = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobals' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );
  var ProjectorModeCheckbox = require( 'JOIST/ProjectorModeCheckbox' );

  /**
   * @param {Tandem} tandem 
   */
  function CoulombsLawGlobalOptionsNode( tandem ) {

    var projectorModeCheckbox = new ProjectorModeCheckbox( {
      projectorModeEnabledProperty: CoulombsLawGlobals.projectorModeProperty,
      tandem: tandem.createTandem( 'projectorCheckbox' ),
      phetioDocumentation: 'The checkbox that toggles if projector mode is enabled.'
    } );

    LayoutBox.call( this, _.extend( {
      children: [ projectorModeCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left',
      tandem: tandem
    } ) );
  }

  coulombsLaw.register( 'CoulombsLawGlobalOptionsNode', CoulombsLawGlobalOptionsNode );

  return inherit( LayoutBox, CoulombsLawGlobalOptionsNode );
} );