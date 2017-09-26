// Copyright 2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );

  var CoulombsLawQueryParameters = QueryStringMachine.getAll( {

    // shows a grid that represents the possible locations for the masses in this sim
    // masses are restricted to being placed along this grid and will snap to the lines
    // shown
    showGrid: { type: 'flag' },

    // for development - add a slider to the screen view allows one to slide view the latest mockup
    // overlayed above the sim.
    mockup: { type: 'flag' }
  } );

  coulombsLaw.register( 'CoulombsLawQueryParameters', CoulombsLawQueryParameters );

  return CoulombsLawQueryParameters;
} );
