// Copyright 2017-2019, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu.
 * 
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function ( require ) {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  const merge = require( 'PHET_CORE/merge' );
  const OptionsDialog = require( 'JOIST/OptionsDialog' );
  const ProjectorModeCheckbox = require( 'JOIST/ProjectorModeCheckbox' );

  /**
   * @param {Tandem} tandem 
   */
  function CoulombsLawGlobalOptionsNode( tandem ) {

    const projectorModeCheckbox = new ProjectorModeCheckbox( CoulombsLawColorProfile, {
      tandem: tandem.createTandem( 'projectorCheckbox' ),
      phetioDocumentation: 'The checkbox that toggles if projector mode is enabled.'
    } );

    LayoutBox.call( this, merge( {
      children: [ projectorModeCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left',
      tandem: tandem
    } ) );
  }

  coulombsLaw.register( 'CoulombsLawGlobalOptionsNode', CoulombsLawGlobalOptionsNode );

  return inherit( LayoutBox, CoulombsLawGlobalOptionsNode );
} );