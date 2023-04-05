// Copyright 2018-2023, University of Colorado Boulder

/**
 * Creates the content (key icons and help text) displayed within the keyboard help dialog. The dialog is added in
 * coulombs-law-main.js.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import coulombsLaw from '../../coulombsLaw.js';
import CoulombsLawStrings from '../../CoulombsLawStrings.js';

const adjustAmountLabelString = CoulombsLawStrings.adjustAmountLabel;
const adjustInLargerStepsLabelString = CoulombsLawStrings.adjustInLargerStepsLabel;
const chargeAmountHeadingString = CoulombsLawStrings.chargeAmountHeading;
const chargePositionsHeadingString = CoulombsLawStrings.chargePositionsHeading;
const jumpLeftLabelString = CoulombsLawStrings.jumpLeftLabel;
const jumpRightLabelString = CoulombsLawStrings.jumpRightLabel;
const jumpToMaximumLabelString = CoulombsLawStrings.jumpToMaximumLabel;
const jumpToMinimumLabelString = CoulombsLawStrings.jumpToMinimumLabel;
const moveChargesLabelString = CoulombsLawStrings.moveChargesLabel;
const moveInLargerStepsLabelString = CoulombsLawStrings.moveInLargerStepsLabel;
const moveInSmallerStepsLabelString = CoulombsLawStrings.moveInSmallerStepsLabel;
const moveRulerHeadingString = CoulombsLawStrings.moveRulerHeading;
const moveRulerLabelString = CoulombsLawStrings.moveRulerLabel;
const moveChargesDescriptionString = CoulombsLawStrings.a11y.moveChargesDescription;
const smallStepsMoveChargesDescriptionString = CoulombsLawStrings.a11y.smallStepsMoveChargesDescription;
const largeStepsMoveChargesDescriptionString = CoulombsLawStrings.a11y.largeStepsMoveChargesDescription;
const jumpHomeDescriptionString = CoulombsLawStrings.a11y.jumpHomeDescription;
const jumpEndDescriptionString = CoulombsLawStrings.a11y.jumpEndDescription;
const moveRulerDescriptionString = CoulombsLawStrings.a11y.moveRulerDescription;
const adjustChargeAmountDescriptionString = CoulombsLawStrings.a11y.adjustChargeAmountDescription;
const largeStepsAdjustAmountDescriptionString = CoulombsLawStrings.a11y.largeStepsAdjustAmountDescription;
const jumpToMinimumDescriptionString = CoulombsLawStrings.a11y.jumpToMinimumDescription;
const jumpToMaximumDescriptionString = CoulombsLawStrings.a11y.jumpToMaximumDescription;

class CoulombsLawKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  constructor() {

    const helpContentOptions = {

      // i18n, restricts both labelText and maxWidth, see KeyboardHelpSection
      textMaxWidth: 250
    };

    const chargeContent = new ChargePositionsContent( helpContentOptions );
    const rulerContent = new MoveRulerContent( helpContentOptions );
    KeyboardHelpSection.alignHelpSectionIcons( [ chargeContent, rulerContent ] );
    const leftHelpContent = [ chargeContent, rulerContent ];

    const basicActionsHelpContent = new BasicActionsKeyboardHelpSection( merge( helpContentOptions, {
      withCheckboxContent: true
    } ) );
    const adjustChargeContent = new AdjustChargeContent( helpContentOptions );
    KeyboardHelpSection.alignHelpSectionIcons( [ adjustChargeContent, basicActionsHelpContent ] );
    const rightHelpContent = [ adjustChargeContent, basicActionsHelpContent ];

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
    const homeKeyIcon = TextKeyNode.home();
    const endKeyIcon = TextKeyNode.end();
    const rows = [
      createRow( moveChargesLabelString, arrowsIcon, moveChargesDescriptionString ),
      createRow( moveInSmallerStepsLabelString, shiftPlusArrowsIcon, smallStepsMoveChargesDescriptionString ),
      createRow( moveInLargerStepsLabelString, pgUpDownIcon, largeStepsMoveChargesDescriptionString ),
      createRow( jumpLeftLabelString, homeKeyIcon, jumpHomeDescriptionString ),
      createRow( jumpRightLabelString, endKeyIcon, jumpEndDescriptionString )
    ];
    super( chargePositionsHeadingString, rows, options );
    this.disposeEmitter.addListener( () => rows.forEach( row => row.dispose() ) );
  }
}

class MoveRulerContent extends KeyboardHelpSection {
  constructor( options ) {
    assert && assert( !options || options.a11yContentTagName === undefined, 'MoveRulerContent sets a11yContentTagName' );

    const icon = KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon();
    const moveRulerRow = createRow( moveRulerLabelString, icon, moveRulerDescriptionString, { tagName: 'p' } );
    super(
      moveRulerHeadingString,
      [ moveRulerRow ],
      merge( {}, options, { a11yContentTagName: null } )
    );
    this.disposeEmitter.addListener( () => moveRulerRow.dispose() );
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
      createRow( jumpToMinimumLabelString, TextKeyNode.home(), jumpToMinimumDescriptionString ),
      createRow( jumpToMaximumLabelString, TextKeyNode.end(), jumpToMaximumDescriptionString )
    ];

    super( chargeAmountHeadingString, rows, options );
    this.disposeEmitter.addListener( () => rows.forEach( row => row.dispose() ) );
  }
}

function createRow( labelText, icon, description, iconOptions ) {
  const options = iconOptions ? { iconOptions: iconOptions } : {};
  options.labelInnerContent = description;
  return KeyboardHelpSectionRow.labelWithIcon( labelText, icon, options );
}

export default CoulombsLawKeyboardHelpContent;