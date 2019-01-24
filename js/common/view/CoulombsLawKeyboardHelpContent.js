// Copyright 2018, University of Colorado Boulder

/**
 * Creates the content (key icons and help text) displayed within the keyboard help dialog. The dialog is added in
 * coulombs-law-main.js.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const CoulombsLawA11yStrings = require( 'COULOMBS_LAW/common/CoulombsLawA11yStrings' );
  const EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  const GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HelpContent = require( 'SCENERY_PHET/keyboard/help/HelpContent' );
  const HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const adjustAmountLabelString = require( 'string!COULOMBS_LAW/adjustAmountLabel' );
  const adjustInLargerStepsLabelString = require( 'string!COULOMBS_LAW/adjustInLargerStepsLabel' );
  const chargeAmountHeadingString = require( 'string!COULOMBS_LAW/chargeAmountHeading' );
  const chargePositionsHeadingString = require( 'string!COULOMBS_LAW/chargePositionsHeading' );
  const jumpLeftLabelString = require( 'string!COULOMBS_LAW/jumpLeftLabel' );
  const jumpRightLabelString = require( 'string!COULOMBS_LAW/jumpRightLabel' );
  const jumpToMaximumLabelString = require( 'string!COULOMBS_LAW/jumpToMaximumLabel' );
  const jumpToMinimumLabelString = require( 'string!COULOMBS_LAW/jumpToMinimumLabel' );
  const moveChargesLabelString = require( 'string!COULOMBS_LAW/moveChargesLabel' );
  const moveInLargerStepsLabelString = require( 'string!COULOMBS_LAW/moveInLargerStepsLabel' );
  const moveInSmallerStepsLabelString = require( 'string!COULOMBS_LAW/moveInSmallerStepsLabel' );
  const moveRulerHeadingString = require( 'string!COULOMBS_LAW/moveRulerHeading' );
  const moveRulerLabelString = require( 'string!COULOMBS_LAW/moveRulerLabel' );

  // a11y strings
  const moveChargesDescriptionString = CoulombsLawA11yStrings.moveChargesDescription.value;
  const smallStepsMoveChargesDescriptionString = CoulombsLawA11yStrings.smallStepsMoveChargesDescription.value;
  const largeStepsMoveChargesDescriptionString = CoulombsLawA11yStrings.largeStepsMoveChargesDescription.value;
  const jumpHomeDescriptionString = CoulombsLawA11yStrings.jumpHomeDescription.value;
  const jumpEndDescriptionString = CoulombsLawA11yStrings.jumpEndDescription.value;
  const moveRulerDescriptionString = CoulombsLawA11yStrings.moveRulerDescription.value;
  const adjustChargeAmountDescriptionString = CoulombsLawA11yStrings.adjustChargeAmountDescription.value;
  const largeStepsAdjustAmountDescriptionString = CoulombsLawA11yStrings.largeStepsAdjustAmountDescription.value;
  const jumpToMinimumDescriptionString = CoulombsLawA11yStrings.jumpToMinimumDescription.value;
  const jumpToMaximumDescriptionString = CoulombsLawA11yStrings.jumpToMaximumDescription.value;

  class CoulombsLawKeyboardHelpContent extends HBox {

    constructor() {

      var helpContentOptions = {
        
        // i18n, restricts both labelText and maxWidth, see HelpContent
        labelMaxWidth: 130
      };

      const chargeContent = new ChargePositionsContent( helpContentOptions );
      const rulerContent = new MoveRulerContent( helpContentOptions );
      HelpContent.alignHelpContentIcons( [ chargeContent, rulerContent ] );

      const leftHelpContent = new VBox( {
        children: [ chargeContent, rulerContent ],
        align: 'left',
        spacing: 30
      } );

      const generalNavigationHelpContent = new GeneralNavigationHelpContent( helpContentOptions );
      const adjustChargeContent = new AdjustChargeContent( helpContentOptions );
      HelpContent.alignHelpContentIcons( [ adjustChargeContent, generalNavigationHelpContent ] );

      const rightHelpContent = new VBox( {
        children: [ adjustChargeContent, generalNavigationHelpContent ],
        align: 'left',
        spacing: 30
      } );
      super( {
        children: [ leftHelpContent, rightHelpContent ],
        align: 'top',
        spacing: 30
      } );
    }
  }

  coulombsLaw.register( 'CoulombsLawKeyboardHelpContent', CoulombsLawKeyboardHelpContent );

  class ChargePositionsContent extends HelpContent {
    constructor( options ) {
      const arrowsIcon = HelpContent.leftRightArrowKeysRowIcon();
      const shiftPlusArrowsIcon = HelpContent.shiftPlusIcon( HelpContent.leftRightArrowKeysRowIcon() );
      const pgUpDownIcon = HelpContent.pageUpPageDownRowIcon();
      const homeKeyIcon = new HomeKeyNode();
      const endKeyIcon = new EndKeyNode();
      const content = [
        createRow( moveChargesLabelString, arrowsIcon, moveChargesDescriptionString ),
        createRow( moveInSmallerStepsLabelString, shiftPlusArrowsIcon, smallStepsMoveChargesDescriptionString ),
        createRow( moveInLargerStepsLabelString, pgUpDownIcon, largeStepsMoveChargesDescriptionString ),
        createRow( jumpLeftLabelString, homeKeyIcon, jumpHomeDescriptionString ),
        createRow( jumpRightLabelString, endKeyIcon, jumpEndDescriptionString )
      ];
      super( chargePositionsHeadingString, content, options );
    }
  }

  class MoveRulerContent extends HelpContent {
    constructor( options ) {
      assert && assert( !options || options.a11yContentTagName === undefined, 'MoveRulerContent sets a11yContentTagName' );

      const icon = HelpContent.arrowOrWasdKeysRowIcon();
      super(
        moveRulerHeadingString,
        [ createRow( moveRulerLabelString, icon, moveRulerDescriptionString, { tagName: 'p' } ) ],
        _.extend( {}, options, { a11yContentTagName: null } )
      );
    }
  }

  class AdjustChargeContent extends HelpContent {
    constructor( options ) {
      const leftRightArrowIcon = HelpContent.leftRightArrowKeysRowIcon();
      const upDownArrowIcon = HelpContent.upDownArrowKeysRowIcon();
      const leftRightOrUpDownIcon = HelpContent.iconOrIcon( leftRightArrowIcon, upDownArrowIcon );
      const pgUpDownIcon = HelpContent.pageUpPageDownRowIcon();

      const content = [
        createRow( adjustAmountLabelString, leftRightOrUpDownIcon, adjustChargeAmountDescriptionString ),
        createRow( adjustInLargerStepsLabelString, pgUpDownIcon, largeStepsAdjustAmountDescriptionString ),
        createRow( jumpToMinimumLabelString, new HomeKeyNode(), jumpToMinimumDescriptionString ),
        createRow( jumpToMaximumLabelString, new EndKeyNode(), jumpToMaximumDescriptionString )
      ];

      super( chargeAmountHeadingString, content, options );
    }
  }

  function createRow( labelText, icon, description, iconOptions ) {
    const label = new Text( labelText, {
      font: HelpContent.DEFAULT_LABEL_FONT
    } );

    return HelpContent.labelWithIcon( label, icon, description, iconOptions ? { iconOptions } : null );
  }

  return CoulombsLawKeyboardHelpContent;
} );