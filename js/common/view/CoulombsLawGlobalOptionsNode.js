// Copyright 2017-2019, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import OptionsDialog from '../../../../joist/js/OptionsDialog.js';
import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import inherit from '../../../../phet-core/js/inherit.js';
import LayoutBox from '../../../../scenery/js/nodes/LayoutBox.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawColorProfile from '../CoulombsLawColorProfile.js';

/**
 * @param {Tandem} tandem
 */
function CoulombsLawGlobalOptionsNode( tandem ) {

  const projectorModeCheckbox = new ProjectorModeCheckbox( CoulombsLawColorProfile, {
    tandem: tandem.createTandem( 'projectorCheckbox' ),
    phetioDocumentation: 'The checkbox that toggles if projector mode is enabled.'
  } );

  LayoutBox.call( this, {
    children: [ projectorModeCheckbox ],
    spacing: OptionsDialog.DEFAULT_SPACING,
    align: 'left',
    tandem: tandem
  } );
}

coulombsLaw.register( 'CoulombsLawGlobalOptionsNode', CoulombsLawGlobalOptionsNode );

inherit( LayoutBox, CoulombsLawGlobalOptionsNode );
export default CoulombsLawGlobalOptionsNode;