// Copyright 2017, University of Colorado Boulder

define( function ( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawGlobals = require( 'COULOMBS_LAW/common/view/CoulombsLawGlobals' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var optionsProjectorModeString = require( 'string!COULOMBS_LAW/options.projectorMode' );

  function CoulombsLawGlobalOptionsNode( tandem ) {
    
    var checkBoxText = new Text( optionsProjectorModeString, {
      font: OptionsDialog.DEFAULT_FONT,
      tandem: tandem.createTandem( 'projectoModeCheckBoxString' )
    } );

    var projectorModeCheckBox = new CheckBox( checkBoxText, CoulombsLawGlobals.projectorModeProperty, {
      tandem: tandem.createTandem( 'projectorModeCheckBox' )
    } );

    LayoutBox.call( this, _.extend( {
      children: [ projectorModeCheckBox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left',
      tandem: tandem
    } ) );
  }

  coulombsLaw.register( 'CoulombsLawGlobalOptionsNode', CoulombsLawGlobalOptionsNode );

  return inherit( LayoutBox, CoulombsLawGlobalOptionsNode );
} );