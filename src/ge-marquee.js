
'use strict';

/**
 * @file    Recreates the web 1.0 "Marquee" feature
 * @author  Fimion
 */

import { geoExtendElement, validateCSSRule } from './ge-shared.js';


const MARQUEE_ATTRS = {
  behavior: 'scroll',
  bgcolor: 'transparent',
  direction: 'left',
  height: 'auto',
  hspace: 0,
  loop: -1,
  scrollamount: 6,
  scrolldelay: 85,
  truespeed: false,
  vspace: 0,
  width: 'auto'
};


/**
 * Geo extend element description.
 *
 * @param  {[type]} 'ge-marquee'   [description]
 * @param  {[type]} HTMLElement    [description]
 * @param  {Array}  options.attrs  [description]
 * @return {[type]}                [description]
 */
export default class GeoElementMarqee extends geoExtendElement(
  'ge-marquee',
  HTMLElement,
  { attrs: MARQUEE_ATTRS }
) {
  #divElement;
  #currentAnimation;
  #reducedMotion;

  /**
   * Constructor description.
   *
   * @return {[type]} [description]
   */
  constructor () {
    super();
    this.#divElement = this.jj.div;
    this.#divElement.part = 'wrapper';
    this.#divElement.append(this.slotElement);
    this.shadowRoot.append(this.#divElement);
    this.#currentAnimation = null;

    this.#reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');

    this.#reducedMotion.addEventListener('change', this.#updateScroll.bind(this));
  }

  #getScrollWidth () {
    const div = this.jj.div;
    div.innerText = this.innerText;
    this.shadowRoot.append(div);
    const mySize = div.scrollWidth;
    this.shadowRoot.removeChild(div);
    return mySize;
  }

  #updateStyle () {
    const validBgcolor = validateCSSRule('background-color', this.attrs.bgcolor) || MARQUEE_ATTRS.bgcolor;
    this.css`
      :host {
        display: inline-block;
        overflow: hidden;
        text-align: initial;
        white-space: nowrap;
        width: -webkit-fill-available;
        max-width: 100%;
        background-color:${validBgcolor};
      }

      :host([direction="up"]),
      :host([direction="down"]) {
        overflow: initial;
        overflow-y: hidden;
        white-space: initial;
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          overflow-x: auto;
        }

        :host([direction="up"]),
        :host([direction="down"]) {
          overflow-y: scroll;
        }
      }`;
  }

  /**
   * Update scroll description.
   */
  #updateScroll () {
    this.#updateStyle();
    const scrollAmount = Number(this.attrs.scrollamount);
    const trueSpeed = typeof this.attrs.truespeed === 'string';
    const tempDelay = Number(this.attrs.scrolldelay);
    let scrollDelay = tempDelay;

    if (!trueSpeed) {
      if (tempDelay < 60) {
        scrollDelay = 60;
      }
    }

    let start; let end; let duration;

    const dirAttr = this.attrs.direction;
    const direction = ['left', 'right', 'up', 'down'].includes(dirAttr) ? dirAttr : 'left';
    switch (direction) {
      case 'up': {
        start = `translateY(${this.offsetHeight}px)`;
        end = `translateY(-${this.offsetHeight}px)`;
        duration = (this.offsetHeight * 2) / (scrollAmount / scrollDelay);
        break;
      }
      case 'down': {
        start = `translateY(-${this.offsetHeight}px)`;
        end = `translateY(${this.offsetHeight}px)`;
        duration = (this.offsetHeight * 2) / (scrollAmount / scrollDelay);
        break;
      }
      case 'right': {
        const width = this.#getScrollWidth();
        end = `translateX(${this.offsetWidth}px)`;
        start = `translateX(-${width}px)`;
        duration = (this.offsetWidth + width) / (scrollAmount / scrollDelay);
        break;
      }
      case 'left':
      default: {
        const width = this.#getScrollWidth();
        start = `translateX(${this.offsetWidth}px)`;
        end = `translateX(-${width}px)`;
        duration = (this.offsetWidth + width) / (scrollAmount / scrollDelay);
        break;
      }
    }
    if (this.#currentAnimation) {this.#currentAnimation.cancel();}
    console.log(this.#reducedMotion);
    if (this.#reducedMotion.matches) {
      this.tabIndex = 1;
      return;
    }
    this.removeAttribute('tabindex');
    this.#currentAnimation = this.#divElement.animate([
      { transform: start },
      { transform: end }
    ],
    {
      duration,
      iterations: Infinity
    });
  }

  /**
   * Connected callback description.
   */
  connectedCallback () {
    this.#updateScroll();
  }

  /**
   * Attribute changed callback description.
   */
  attributeChangedCallback (/* key */) {
    this.#updateScroll();
  }
}
