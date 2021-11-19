// Copyright 2020-2021, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import coulombsLaw from './coulombsLaw.js';

type StringsType = {
  'charge1': string,
  'charge2': string,
  'charge1Abbreviated': string,
  'charge2Abbreviated': string,
  'coulombs-law': {
    'title': string
  },
  'pmScale': string,
  'screen': {
    'macroScale': string,
    'atomicScale': string
  },
  'units': {
    'atomicUnits': string,
    'atomicLegendScale': string,
    'macroLegendScale': string,
    'microcoulombs': string
  },
  'chargePositionsHeading': string,
  'moveChargesLabel': string,
  'moveInLargerStepsLabel': string,
  'moveInSmallerStepsLabel': string,
  'jumpLeftLabel': string,
  'jumpRightLabel': string,
  'moveRulerHeading': string,
  'moveRulerLabel': string,
  'chargeAmountHeading': string,
  'adjustAmountLabel': string,
  'adjustInLargerStepsLabel': string,
  'jumpToMinimumLabel': string,
  'jumpToMaximumLabel': string,
  'a11y': {
    'moveChargesDescription': string,
    'smallStepsMoveChargesDescription': string,
    'largeStepsMoveChargesDescription': string,
    'jumpHomeDescription': string,
    'jumpEndDescription': string,
    'moveRulerDescription': string,
    'adjustChargeAmountDescription': string,
    'largeStepsAdjustAmountDescription': string,
    'jumpToMinimumDescription': string,
    'jumpToMaximumDescription': string
  }
};

const coulombsLawStrings = getStringModule( 'COULOMBS_LAW' ) as StringsType;

coulombsLaw.register( 'coulombsLawStrings', coulombsLawStrings );

export default coulombsLawStrings;
