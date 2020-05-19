// Copyright 2017-2018, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 * @author Michael Barlow
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import atomicScaleScreenIconNavbar from '../../images/atomic_scale_screen_icon_navbar_png.js';
import atomicScaleScreenIcon from '../../images/atomic_scale_screen_icon_png.js';
import CoulombsLawColorProfile from '../common/CoulombsLawColorProfile.js';
import coulombsLawStrings from '../coulombsLawStrings.js';
import coulombsLaw from '../coulombsLaw.js';
import CoulombsLawAtomicModel from './model/CoulombsLawAtomicModel.js';
import CoulombsLawAtomicView from './view/CoulombsLawAtomicView.js';

const screenAtomicScaleString = coulombsLawStrings.screen.atomicScale;


/**
 * @param {Tandem} tandem
 * @constructor
 */
function CoulombsLawAtomicScreen( tandem ) {

  const options = {
    backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
    name: screenAtomicScaleString,
    homeScreenIcon: new ScreenIcon( new Image( atomicScaleScreenIcon, { tandem: tandem.createTandem( 'icon' ) } ), {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } ),
    navigationBarIcon: new Image( atomicScaleScreenIconNavbar, { tandem: tandem.createTandem( 'navbarIcon' ) } ),
    tandem: tandem
  };

  const atomicScreenTandem = tandem.createTandem( 'coulombsLawAtomicScreen' );

  Screen.call( this,
    function() { return new CoulombsLawAtomicModel( atomicScreenTandem.createTandem( 'model' ) ); },
    function( model ) { return new CoulombsLawAtomicView( model, atomicScreenTandem.createTandem( 'view' ) ); },
    options
  );
}

coulombsLaw.register( 'CoulombsLawAtomicScreen', CoulombsLawAtomicScreen );

inherit( Screen, CoulombsLawAtomicScreen );
export default CoulombsLawAtomicScreen;