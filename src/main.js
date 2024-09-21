'use strict';
/**
 * @file    Entry point for the library. Exposes the external facing function that accepts the input defined in the API documentation.
 * @author  Fimion
 */

import GeoElementBackground from './ge-background.js';
import GeoElementBlink from './ge-blink.js';
import GeoElementCenter from './ge-center.js';
import GeoElementFont from './ge-font.js';
import GeoElementImage from './ge-img.js';
import GeoElementMarquee from './ge-marquee.js';
import styles from './ge-styles.css?raw';

GeoElementBackground.register();
GeoElementFont.register();
GeoElementImage.register();
GeoElementCenter.register();
GeoElementBlink.register();
GeoElementMarquee.register();
const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.append(styleEl);
