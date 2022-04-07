'use strict';

/**
 * @file    Recreates the web 1.0 "Blink" feature
 * @author  Fimion
 */

import { geoExtendElement } from './ge-shared.js';

/**
 * Geo extend element description.
 *
 * @param  {[type]} 'ge-blink'  [description]
 * @return {[type]}             [description]
 */
export default class GeoElementBlink extends geoExtendElement('ge-blink') {
  /**
   * Constructor description.
   *
   * @return {[type]} description
   */
  constructor () {
    super();
    this.css`
    :host{
      font-size:inherit;
      line-height:inherit;
    }
    slot{
      animation: 2s linear infinite condemned_blink_effect;
    }

    @keyframes condemned_blink_effect {
      0% {visibility: hidden;}
      50% {visibility: hidden;}
      100% {visibility: visible;}
    }
    @media (prefers-reduced-motion) {
      slot {
        animation:none;
        text-shadow: 0 0 0.1rem red,
                     0 0 0.2rem orange,
                     0 0 0.3rem yellow,
                     0 0 0.4rem green,
                     0 0 0.5rem blue,
                     0 0 0.6rem indigo,
                     0 0 0.7rem violet;
     }
   }`;
  }
}
