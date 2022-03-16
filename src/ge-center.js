'use strict';

/**
 * @file    Forces element to block display and centers the contents using text-align
 * @author  Fimion
 */

import { geoExtendElement } from './ge-shared.js';

/**
 * Geo extend element description.
 *
 * @param  {[type]} 'ge-center'  [description]
 * @return {[type]}              [description]
 */
export default class GeoElementCenter extends geoExtendElement('ge-center') {
  /**
   * Constructor description.
   *
   * @return {[type]} [description]
   */
  constructor () {
    super();
    this.css`slot{display:block; text-align:center}`;
  }
}
