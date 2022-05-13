/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;