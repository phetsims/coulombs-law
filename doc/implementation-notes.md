# Coulomb's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description in https://github.com/phetsims/coulombs-law/blob/master/doc/model.md

Following that, almost all types in the model and view are inherited from the Inverse Square Law Common library. It will be useful to become familiar with its [model](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/model.md) and [implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md)

The primary type in this sim is the `Charge`. It handles all positioning as well as the charge values needed to calculate the displayed force. It is an ISLCObject with constant radius & density.

The primary distinction within Coulomb's Law is it's handling of negative object properties (charges) and force values. Here the force can be attractive or repulsive, and it is measured from the objects' centers.

## View

The user will mainly be interacting with the ruler, the charge objects, and their control panel. The user can drag the charges by clicking either the charge itself or its respective puller/pusher (the attached robot figure - see [ISLCObjectNode](https://github.com/phetsims/inverse-square-law-common/blob/master/js/view/ISLCObjectNode.js) for more details). Additionally, the charge objects have a minimum separation that is always maintained. When dragging one charge, the other's position will never change. Finally, the arrows are added to the screenviews as siblings of the charge nodes themselves. This ensures that both arrows appear in the top layer of the scene graph.

### Scale
In order to utilize a common codebase (Inverse Square Law Common - ISLC) between the two screens and the Gravity Force Labs, we needed to use a scale factor for both the charge and sim distance values. The ISLC model makes all calculations in meters and coulombs, thus both screens must convert their relative scales to those units to ensure consistent accuracy.

### Charge Nodes
These are instances of ISLCObjectNodes with constant radius and the ability for different arrow directions. See the [ISLC implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md) for the details on updating pullers, force values, and arrows.