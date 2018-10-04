// Copyright 2017, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );

  const CoulombsLawA11yStrings = {

    ///////////////////////////////////////////////////////////
    // Keyboard help dialog PDOM descriptions and help text. //
    ///////////////////////////////////////////////////////////

    moveChargesDescription: {
      value: 'Move the charges with the left and right arrows'
    },
    largeStepsMoveChargesDescription: {
      value: 'Move in larger steps with the page up and page down keys'
    },
    jumpHomeDescription: {
      value: 'Jump to the left with the home key'
    },
    jumpEndDescription: {
      value: 'Jump to the right with the end key'
    },
    moveRulerDescription: {
      value: 'Move the ruler with the arrows or W, A,S, or D keys '
    },
    adjustChargeAmountDescription: {
      value: 'Adjust the charge amount with the arrow keys'
    },
    largeStepsAdjustAmountDescription: {
      value: 'Adjust the charge in larger steps with page up or page down'
    },
    jumpToMinimumDescription: {
      value: 'Jump to the minimum amount with the home key'
    },
    jumpToMaximumDescription: {
      value: 'Jump to the maximum amount with the end key'
    }
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in CoulombsLawA11yStrings ) {
      CoulombsLawA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( CoulombsLawA11yStrings ); }

  return coulombsLaw.register( 'CoulombsLawA11yStrings', CoulombsLawA11yStrings );
} );