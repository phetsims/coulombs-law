// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import coulombsLaw from './coulombsLaw.js';

type StringsType = {
  'charge1': string;
  'charge1Property': TReadOnlyProperty<string>;
  'charge2': string;
  'charge2Property': TReadOnlyProperty<string>;
  'charge1Abbreviated': string;
  'charge1AbbreviatedProperty': TReadOnlyProperty<string>;
  'charge2Abbreviated': string;
  'charge2AbbreviatedProperty': TReadOnlyProperty<string>;
  'coulombs-law': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'pmScale': string;
  'pmScaleProperty': TReadOnlyProperty<string>;
  'screen': {
    'macroScale': string;
    'macroScaleProperty': TReadOnlyProperty<string>;
    'atomicScale': string;
    'atomicScaleProperty': TReadOnlyProperty<string>;
  };
  'units': {
    'atomicUnits': string;
    'atomicUnitsProperty': TReadOnlyProperty<string>;
    'atomicLegendScale': string;
    'atomicLegendScaleProperty': TReadOnlyProperty<string>;
    'macroLegendScale': string;
    'macroLegendScaleProperty': TReadOnlyProperty<string>;
    'microcoulombs': string;
    'microcoulombsProperty': TReadOnlyProperty<string>;
  };
  'chargePositionsHeading': string;
  'chargePositionsHeadingProperty': TReadOnlyProperty<string>;
  'moveChargesLabel': string;
  'moveChargesLabelProperty': TReadOnlyProperty<string>;
  'moveInLargerStepsLabel': string;
  'moveInLargerStepsLabelProperty': TReadOnlyProperty<string>;
  'moveInSmallerStepsLabel': string;
  'moveInSmallerStepsLabelProperty': TReadOnlyProperty<string>;
  'jumpLeftLabel': string;
  'jumpLeftLabelProperty': TReadOnlyProperty<string>;
  'jumpRightLabel': string;
  'jumpRightLabelProperty': TReadOnlyProperty<string>;
  'moveRulerHeading': string;
  'moveRulerHeadingProperty': TReadOnlyProperty<string>;
  'moveRulerLabel': string;
  'moveRulerLabelProperty': TReadOnlyProperty<string>;
  'chargeAmountHeading': string;
  'chargeAmountHeadingProperty': TReadOnlyProperty<string>;
  'adjustAmountLabel': string;
  'adjustAmountLabelProperty': TReadOnlyProperty<string>;
  'adjustInLargerStepsLabel': string;
  'adjustInLargerStepsLabelProperty': TReadOnlyProperty<string>;
  'jumpToMinimumLabel': string;
  'jumpToMinimumLabelProperty': TReadOnlyProperty<string>;
  'jumpToMaximumLabel': string;
  'jumpToMaximumLabelProperty': TReadOnlyProperty<string>;
  'a11y': {
    'moveChargesDescription': string;
    'moveChargesDescriptionProperty': TReadOnlyProperty<string>;
    'smallStepsMoveChargesDescription': string;
    'smallStepsMoveChargesDescriptionProperty': TReadOnlyProperty<string>;
    'largeStepsMoveChargesDescription': string;
    'largeStepsMoveChargesDescriptionProperty': TReadOnlyProperty<string>;
    'jumpHomeDescription': string;
    'jumpHomeDescriptionProperty': TReadOnlyProperty<string>;
    'jumpEndDescription': string;
    'jumpEndDescriptionProperty': TReadOnlyProperty<string>;
    'moveRulerDescription': string;
    'moveRulerDescriptionProperty': TReadOnlyProperty<string>;
    'adjustChargeAmountDescription': string;
    'adjustChargeAmountDescriptionProperty': TReadOnlyProperty<string>;
    'largeStepsAdjustAmountDescription': string;
    'largeStepsAdjustAmountDescriptionProperty': TReadOnlyProperty<string>;
    'jumpToMinimumDescription': string;
    'jumpToMinimumDescriptionProperty': TReadOnlyProperty<string>;
    'jumpToMaximumDescription': string;
    'jumpToMaximumDescriptionProperty': TReadOnlyProperty<string>;
  }
};

const coulombsLawStrings = getStringModule( 'COULOMBS_LAW' ) as StringsType;

coulombsLaw.register( 'coulombsLawStrings', coulombsLawStrings );

export default coulombsLawStrings;
