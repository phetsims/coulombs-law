// Copyright 2017-2021, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import OptionsDialog from '../../../../joist/js/OptionsDialog.js';
import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import LayoutBox from '../../../../scenery/js/nodes/LayoutBox.js';
import coulombsLaw from '../../coulombsLaw.js';

class CoulombsLawGlobalOptionsNode extends LayoutBox {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const projectorModeCheckbox = new ProjectorModeCheckbox( null, {
      tandem: tandem.createTandem( 'projectorCheckbox' ),
      phetioDocumentation: 'The checkbox that toggles if projector mode is enabled.'
    } );

    super( {
      children: [ projectorModeCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left',
      tandem: tandem
    } );

    // @private
    this.disposeGlobalOptionsNode = () => {
      projectorModeCheckbox.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeGlobalOptionsNode();
    super.dispose();
  }
}

coulombsLaw.register( 'CoulombsLawGlobalOptionsNode', CoulombsLawGlobalOptionsNode );

export default CoulombsLawGlobalOptionsNode;