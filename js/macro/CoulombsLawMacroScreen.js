// Copyright 2017-2018, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import macroScaleScreenIconNavbar from '../../images/macro_scale_screen_icon_navbar_png.js';
import macroScaleScreenIcon from '../../images/macro_scale_screen_icon_png.js';
import CoulombsLawColorProfile from '../common/CoulombsLawColorProfile.js';
import coulombsLaw from '../coulombsLaw.js';
import coulombsLawStrings from '../coulombsLawStrings.js';
import CoulombsLawMacroModel from './model/CoulombsLawMacroModel.js';
import CoulombsLawMacroView from './view/CoulombsLawMacroView.js';

const screenMacroScaleString = coulombsLawStrings.screen.macroScale;


/**
 * @param {Tandem} tandem
 * @constructor
 */
function CoulombsLawMacroScreen( tandem ) {

  const options = {
    backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
    name: screenMacroScaleString,
    homeScreenIcon: new ScreenIcon( new Image( macroScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ), {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } ),
    navigationBarIcon: new ScreenIcon( new Image( macroScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ), {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } ),
    tandem: tandem
  };

  const macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

  Screen.call( this,
    function() { return new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ); },
    function( model ) { return new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ); },
    options
  );
}

coulombsLaw.register( 'CoulombsLawMacroScreen', CoulombsLawMacroScreen );

inherit( Screen, CoulombsLawMacroScreen );
export default CoulombsLawMacroScreen;