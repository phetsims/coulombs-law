// Copyright 2017-2022, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import atomicScaleScreenIcon_png from '../../images/atomicScaleScreenIcon_png.js';
import atomicScaleScreenIconNavbar_png from '../../images/atomicScaleScreenIconNavbar_png.js';
import CoulombsLawColors from '../common/CoulombsLawColors.js';
import CoulombsLawKeyboardHelpContent from '../common/view/CoulombsLawKeyboardHelpContent.js';
import coulombsLaw from '../coulombsLaw.js';
import CoulombsLawStrings from '../CoulombsLawStrings.js';
import CoulombsLawAtomicModel from './model/CoulombsLawAtomicModel.js';
import CoulombsLawAtomicView from './view/CoulombsLawAtomicView.js';

class CoulombsLawAtomicScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      backgroundColorProperty: CoulombsLawColors.backgroundProperty,
      name: CoulombsLawStrings.screen.atomicScaleStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( atomicScaleScreenIcon_png, { tandem: tandem.createTandem( 'icon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( atomicScaleScreenIconNavbar_png, { tandem: tandem.createTandem( 'navbarIcon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem,
      createKeyboardHelpNode: () => new CoulombsLawKeyboardHelpContent()
    };

    const atomicScreenTandem = tandem.createTandem( 'coulombsLawAtomicScreen' );

    super(
      () => new CoulombsLawAtomicModel( atomicScreenTandem.createTandem( 'model' ) ),
      model => new CoulombsLawAtomicView( model, atomicScreenTandem.createTandem( 'view' ) ),
      options
    );
  }
}

coulombsLaw.register( 'CoulombsLawAtomicScreen', CoulombsLawAtomicScreen );
export default CoulombsLawAtomicScreen;