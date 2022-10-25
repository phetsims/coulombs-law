// Copyright 2017-2022, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import macroScaleScreenIcon_png from '../../images/macroScaleScreenIcon_png.js';
import macroScaleScreenIconNavbar_png from '../../images/macroScaleScreenIconNavbar_png.js';
import CoulombsLawColors from '../common/CoulombsLawColors.js';
import CoulombsLawKeyboardHelpContent from '../common/view/CoulombsLawKeyboardHelpContent.js';
import coulombsLaw from '../coulombsLaw.js';
import CoulombsLawStrings from '../CoulombsLawStrings.js';
import CoulombsLawMacroModel from './model/CoulombsLawMacroModel.js';
import CoulombsLawMacroView from './view/CoulombsLawMacroView.js';

class CoulombsLawMacroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      backgroundColorProperty: CoulombsLawColors.backgroundProperty,
      name: CoulombsLawStrings.screen.macroScaleStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( macroScaleScreenIcon_png, { tandem: tandem.createTandem( 'icon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( macroScaleScreenIconNavbar_png, { tandem: tandem.createTandem( 'navbarIcon' ) } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem,
      createKeyboardHelpNode: () => new CoulombsLawKeyboardHelpContent()
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