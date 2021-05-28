// Copyright 2017-2021, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import atomicScaleScreenIconNavbar from '../../images/atomic_scale_screen_icon_navbar_png.js';
import atomicScaleScreenIcon from '../../images/atomic_scale_screen_icon_png.js';
import CoulombsLawColorProfile from '../common/CoulombsLawColorProfile.js';
import CoulombsLawKeyboardHelpContent from '../common/view/CoulombsLawKeyboardHelpContent.js';
import coulombsLaw from '../coulombsLaw.js';
import coulombsLawStrings from '../coulombsLawStrings.js';
import CoulombsLawAtomicModel from './model/CoulombsLawAtomicModel.js';
import CoulombsLawAtomicView from './view/CoulombsLawAtomicView.js';

class CoulombsLawAtomicScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: coulombsLawStrings.screen.atomicScale,
      homeScreenIcon: new ScreenIcon( new Image( atomicScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( atomicScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem,
      keyboardHelpNode: new CoulombsLawKeyboardHelpContent()
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