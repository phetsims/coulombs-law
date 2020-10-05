// Copyright 2018-2019, University of Colorado Boulder

/**
 * Creates the content (key icons and help text) displayed within the keyboard help dialog. The dialog is added in
 * coulombs-law-main.js.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import EndKeyNode from '../../../../scenery-phet/js/keyboard/EndKeyNode.js';
import GeneralKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GeneralKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import HomeKeyNode from '../../../../scenery-phet/js/keyboard/HomeKeyNode.js';
import coulombsLaw from '../../coulombsLaw.js';
import coulombsLawStrings from '../../coulombsLawStrings.js';

const adjustAmountLabelString = coulombsLawStrings.adjustAmountLabel;
const adjustInLargerStepsLabelString = coulombsLawStrings.adjustInLargerStepsLabel;
const chargeAmountHeadingString = coulombsLawStrings.chargeAmountHeading;
const chargePositionsHeadingString = coulombsLawStrings.chargePositionsHeading;
const jumpLeftLabelString = coulombsLawStrings.jumpLeftLabel;
const jumpRightLabelString = coulombsLawStrings.jumpRightLabel;
const jumpToMaximumLabelString = coulombsLawStrings.jumpToMaximumLabel;
const jumpToMinimumLabelString = coulombsLawStrings.jumpToMinimumLabel;
const moveChargesLabelString = coulombsLawStrings.moveChargesLabel;
const moveInLargerStepsLabelString = coulombsLawStrings.moveInLargerStepsLabel;
const moveInSmallerStepsLabelString = coulombsLawStrings.moveInSmallerStepsLabel;
const moveRulerHeadingString = coulombsLawStrings.moveRulerHeading;
const moveRulerLabelString = coulombsLawStrings.moveRulerLabel;
const moveChargesDescriptionString = coulombsLawStrings.a11y.moveChargesDescription;
const smallStepsMoveChargesDescriptionString = coulombsLawStrings.a11y.smallStepsMoveChargesDescription;
const largeStepsMoveChargesDescriptionString = coulombsLawStrings.a11y.largeStepsMoveChargesDescription;
const jumpHomeDescriptionString = coulombsLawStrings.a11y.jumpHomeDescription;
const jumpEndDescriptionString = coulombsLawStrings.a11y.jumpEndDescription;
const moveRulerDescriptionString = coulombsLawStrings.a11y.moveRulerDescription;
const adjustChargeAmountDescriptionString = coulombsLawStrings.a11y.adjustChargeAmountDescription;
const largeStepsAdjustAmountDescriptionString = coulombsLawStrings.a11y.largeStepsAdjustAmountDescription;
const jumpToMinimumDescriptionString = coulombsLawStrings.a11y.jumpToMinimumDescription;
const jumpToMaximumDescriptionString = coulombsLawStrings.a11y.jumpToMaximumDescription;

class CoulombsLawKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  constructor() {

    const helpContentOptions = {

      // i18n, restricts both labelText and maxWidth, see KeyboardHelpSection
      labelMaxWidth: 250
    };

    const chargeContent = new ChargePositionsContent( helpContentOptions );
    const rulerContent = new MoveRulerContent( helpContentOptions );
    KeyboardHelpSection.alignHelpSectionIcons( [ chargeContent, rulerContent ] );
    const leftHelpContent = [ chargeContent, rulerContent ];

    const generalNavigationHelpContent = new GeneralKeyboardHelpSection( merge( helpContentOptions, {
      withGroupContent: true,
      withCheckboxContent: true
    } ) );
    const adjustChargeContent = new AdjustChargeContent( helpContentOptions );
    KeyboardHelpSection.alignHelpSectionIcons( [ adjustChargeContent, generalNavigationHelpContent ] );
    const rightHelpContent = [ adjustChargeContent, generalNavigationHelpContent ];

    super( leftHelpContent, rightHelpContent );
  }
}

coulombsLaw.register( 'CoulombsLawKeyboardHelpContent', CoulombsLawKeyboardHelpContent );

class ChargePositionsContent extends KeyboardHelpSection {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    const arrowsIcon = KeyboardHelpIconFactory.leftRightArrowKeysRowIcon();
    const shiftPlusArrowsIcon = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() );
    const pgUpDownIcon = KeyboardHelpIconFactory.pageUpPageDownRowIcon();
    const homeKeyIcon = new HomeKeyNode();
    const endKeyIcon = new EndKeyNode();
    const rows = [
      createRow( moveChargesLabelString, arrowsIcon, moveChargesDescriptionString ),
      createRow( moveInSmallerStepsLabelString, shiftPlusArrowsIcon, smallStepsMoveChargesDescriptionString ),
      createRow( moveInLargerStepsLabelString, pgUpDownIcon, largeStepsMoveChargesDescriptionString ),
      createRow( jumpLeftLabelString, homeKeyIcon, jumpHomeDescriptionString ),
      createRow( jumpRightLabelString, endKeyIcon, jumpEndDescriptionString )
    ];
    super( chargePositionsHeadingString, rows, options );
  }
}

class MoveRulerContent extends KeyboardHelpSection {
  constructor( options ) {
    assert && assert( !options || options.a11yContentTagName === undefined, 'MoveRulerContent sets a11yContentTagName' );

    const icon = KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon();
    super(
      moveRulerHeadingString,
      [ createRow( moveRulerLabelString, icon, moveRulerDescriptionString, { tagName: 'p' } ) ],
      merge( {}, options, { a11yContentTagName: null } )
    );
  }
}

class AdjustChargeContent extends KeyboardHelpSection {
  constructor( options ) {
    const leftRightArrowIcon = KeyboardHelpIconFactory.leftRightArrowKeysRowIcon();
    const upDownArrowIcon = KeyboardHelpIconFactory.upDownArrowKeysRowIcon();
    const leftRightOrUpDownIcon = KeyboardHelpIconFactory.iconOrIcon( leftRightArrowIcon, upDownArrowIcon );
    const pgUpDownIcon = KeyboardHelpIconFactory.pageUpPageDownRowIcon();

    const rows = [
      createRow( adjustAmountLabelString, leftRightOrUpDownIcon, adjustChargeAmountDescriptionString ),
      createRow( adjustInLargerStepsLabelString, pgUpDownIcon, largeStepsAdjustAmountDescriptionString ),
      createRow( jumpToMinimumLabelString, new HomeKeyNode(), jumpToMinimumDescriptionString ),
      createRow( jumpToMaximumLabelString, new EndKeyNode(), jumpToMaximumDescriptionString )
    ];

    super( chargeAmountHeadingString, rows, options );
  }
}

function createRow( labelText, icon, description, iconOptions ) {
  return KeyboardHelpSection.labelWithIcon( labelText, icon, description, iconOptions ? { iconOptions: iconOptions } : null );
}

export default CoulombsLawKeyboardHelpContent;