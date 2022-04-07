'use strict';

/**
 * @file    Handles image related HTML attributes and CSS properties
 * @author  Fimion
 */

import { geoExtendElement } from './ge-shared.js';

const IMG_ATTRS = [
  'alt',
  'height',
  'loading',
  'sizes',
  'src',
  'srcset',
  'width'
];

const DIALUP_TIME = 10000;

/**
 * Geo extend element description.
 *
 * @param  {string}  'ge-img'        [description]
 * @param  {[type]}  HTMLElement     [description]
 * @param  {Array}   options.attrs   [description]
 * @param  {boolean} options.noSlot  [description]
 * @return {[type]}                  [description]
 */
export default class GeoElementImage extends geoExtendElement(
  'ge-img',
  HTMLElement,
  { attrs: IMG_ATTRS, noSlot: true }
) {
  #image;
  #placeHolder;

  static #promiseList = [Promise.resolve()];

  /**
   * Constructor description.
   *
   * @return {[type]} [description]
   */
  constructor () {
    super();

    this.#image = this.cE('img');
    this.#placeHolder = this.cE('span');
    this.css`
      img.loading{
        clip-path: inset(0 0 100% 0);
        height:0;
        width:0;
      }
      span{
        display: inline-block;
        height:16px;
        width:16px;
        border: 2px grey inset;
      }`;

    this.shadowRoot.append(this.#image, this.#placeHolder);
  }

  /**
   * Attribute changed callback description.
   *
   * @param {[type]} attr  [description]
   */
  attributeChangedCallback (attr/* , oldValue, newValue */) {
    this.updateImage();
    if (attr === 'src' || attr === 'srcset') {
      this.updateAnimation();
    }
  }

  /**
   * Animation offset promise description.
   *
   * @param  {Promise} finished  [description]
   * @return {Promise}           [description]
   */
  #animationOffsetPromise (finished) {
    return new Promise((resolve) => {
      finished.then((result) => resolve(result));
    });
  }

  /**
   * Animation offset description.
   *
   * @param {[type]} finished  [description]
   */
  set #animationOffset (finished) {
    GeoElementImage.#promiseList.push(this.#animationOffsetPromise(finished));
  }

  /**
   * Animation offset description.
   *
   * @return {[type]} [description]
   */
  get #animationOffset () {
    return GeoElementImage.#promiseList[GeoElementImage.#promiseList.length - 1];
  }

  /**
   * Update image description.
   */
  updateImage () {
    IMG_ATTRS.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this.#image[attr] = this.attrs[attr];
      }
    });
  }

  /**
   * Update animation description.
   */
  updateAnimation () {
    this.shadowRoot.append(this.#placeHolder);
    this.#image.classList.add('loading');
    const animation = this.#image.animate(
      [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
      DIALUP_TIME
    );
    /*
    const animationPromise = animation.finished.then(() => {
      this.#image.classList.remove('loading');
      return Promise.resolve();
    });
    */

    animation.pause();

    this.#animationOffset.then(() => {
      this.#image.classList.remove('loading');
      this.shadowRoot.removeChild(this.#placeHolder);
      if (this.#image.complete) {
        animation.play();
      } else {
        this.#image.addEventListener('load', () => {
          animation.play();
        });
      }
    });
    this.#animationOffset = animation.finished;
  }
}
