import GeoElementBackground from './ge-background.js';
import GeoElementFont from './ge-font.js';
import GeoElementImage from './ge-img.js';
import GeoElementCenter from './ge-center.js';
import GeoElementBlink from './ge-blink.js';
import GeoElementMarquee from './ge-marquee.js';
import styles from './ge-styles.css';

GeoElementBackground.register();
GeoElementFont.register();
GeoElementImage.register();
GeoElementCenter.register();
GeoElementBlink.register();
GeoElementMarquee.register();
const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.append(styleEl);