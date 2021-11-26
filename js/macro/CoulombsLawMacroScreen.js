// Copyright 2017-2021, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import macroScaleScreenIconNavbar from '../../images/macro_scale_screen_icon_navbar_png.js';
import macroScaleScreenIcon from '../../images/macro_scale_screen_icon_png.js';
import CoulombsLawColors from '../common/CoulombsLawColors.js';
import CoulombsLawKeyboardHelpContent from '../common/view/CoulombsLawKeyboardHelpContent.js';
import coulombsLaw from '../coulombsLaw.js';
import coulombsLawStrings from '../coulombsLawStrings.js';
import CoulombsLawMacroModel from './model/CoulombsLawMacroModel.js';
import CoulombsLawMacroView from './view/CoulombsLawMacroView.js';

class CoulombsLawMacroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      backgroundColorProperty: CoulombsLawColors.backgroundProperty,
      name: coulombsLawStrings.screen.macroScale,
      homeScreenIcon: new ScreenIcon( new Image( macroScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( macroScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem,
      keyboardHelpNode: new CoulombsLawKeyboardHelpContent()
    };

    const macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

    super(
      () => new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ),
      model => new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ),
      options
    );
  }
}

coulombsLaw.register( 'CoulombsLawMacroScreen', CoulombsLawMacroScreen );
export default CoulombsLawMacroScreen;