# Coulomb's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description in https://github.com/phetsims/coulombs-law/blob/master/doc/model.md

Following that, almost all types in the model and view are inherited from the Inverse Square Law Common library. It will be useful to become familiar with its [model](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/model.md) and [implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md)

The primary type in this sim is the `Charge`. It handles all positioning as well as the charge values needed to calculate the displayed force.

The primary distinction within Coulomb's Law is it's handling of negative object properties (charges) and force values. Here the force can be attractive or repulsive.

## View