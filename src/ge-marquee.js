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
 * @param  {string}      'ge-marquee'   [description]
 * @param  {HTMLElement} HTMLElement    [description]
 * @param  {Array}       options.attrs  [description]
 * @extends geoExtendElement
 * @return {[type]}                     [description]
 */
export default class GeoElementMarquee extends geoExtendElement(
  'ge-marquee',
  HTMLElement,
  { attrs: MARQUEE_ATTRS }
) {
  /** @type HTMLElement */
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
    this.#divElement.part.add('wrapper');
    this.#divElement.append(this.slotElement);
    this.shadowRoot.append(this.#divElement);
    this.#currentAnimation = null;

    this.#reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');

    this.#reducedMotion.addEventListener('change', this.#updateScroll.bind(this));
    this.slotElement.addEventListener('slotchange', this.#updateScroll.bind(this));
    window.addEventListener('resize', this.#updateScroll.bind(this), { passive: true });
  }

  /**
   * @return {number} the current scroll width of the
   */
  #getEndScrollX () {
    return this.#divElement.scrollWidth;
  }

  /**
   *
   */
  #updateStyle () {
    const validBgcolor = validateCSSRule('background-color', this.attrs.bgcolor) || MARQUEE_ATTRS.bgcolor;
    const validHeight = validateCSSRule('height', this.attrs.height + 'px') || MARQUEE_ATTRS.height;
    const validWidth = validateCSSRule('width', this.attrs.width + 'px') || this.parentNode.offsetWidth + 'px';
    this.css`
      :host {
        display: block;
        overflow: hidden;
        text-align: initial;
        white-space: nowrap;
        width: ${validWidth};
        height:${validHeight};
        max-width: 100%;
        background-color: ${validBgcolor};
      }

      :host>div{
        display:inline-block;
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
   * Returns the number of iterations.
   *
   * @return {number} the number of iterations
   */
  get #iterations () {
    const iter = parseInt(this.attrs.loop, 10);
    if (iter <= 0 || Number.isNaN(iter)) {
      if (this.attrs.behavior === 'slide') {
        return 1;
      }
      return Infinity;
    }
    return iter;
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

    let start;
    let end;
    let duration;

    const dirAttr = this.attrs.direction;
    const direction = ['left', 'right', 'up', 'down'].includes(dirAttr) ? dirAttr : 'left';

    let startPos;
    let endPos;

    switch (direction) {
      case 'up': {
        startPos = this.offsetHeight;
        endPos = this.#divElement.scrollHeight;
        if (this.attrs.behavior === 'slide') {
          endPos = 0;
        }
        if (this.attrs.behavior === 'alternate') {
          startPos = this.offsetHeight - this.#divElement.scrollHeight;
          endPos = 0;
        }
        start = `translateY(${startPos}px)`;
        end = `translateY(-${endPos}px)`;
        break;
      }
      case 'down': {
        startPos = this.#divElement.scrollHeight;
        endPos = this.offsetHeight;

        if (this.attrs.behavior === 'slide') {
          startPos = this.#divElement.scrollHeight;
          endPos = (this.#divElement.scrollHeight - this.offsetHeight) * -1;
        }

        if (this.attrs.behavior === 'alternate') {
          startPos = 0;
          endPos = Math.abs(this.offsetHeight - this.#divElement.scrollHeight);
        }
        start = `translateY(-${startPos}px)`;
        end = `translateY(${endPos}px)`;

        if (this.attrs.behavior === 'slide') {
          startPos = 0;
          endPos = this.offsetHeight;
        }

        break;
      }
      case 'right': {
        startPos = this.#getEndScrollX() * -1;
        endPos = this.offsetWidth;
        if (this.attrs.behavior === 'slide') {
          endPos = (this.#divElement.scrollWidth - this.offsetWidth) * -1;
        }
        if (this.attrs.behavior === 'alternate') {
          startPos = 0;
          endPos = (this.#divElement.scrollWidth - this.offsetWidth) * -1;
        }

        start = `translateX(${startPos}px)`;
        end = `translateX(${endPos}px)`;

        if (this.attrs.behavior === 'slide') {
          startPos = 0;
          endPos = this.offsetWidth;
        }
        break;
      }
      case 'left':
      default: {
        startPos = this.offsetWidth;
        endPos = this.#getEndScrollX();
        if (this.attrs.behavior === 'slide') {
          endPos = 0;
        }
        if (this.attrs.behavior === 'alternate') {
          startPos = (this.#divElement.scrollWidth - this.offsetWidth) * -1;
          endPos = 0;
        }

        start = `translateX(${startPos}px)`;
        end = `translateX(-${endPos}px)`;

        break;
      }
    }

    duration = (Math.abs(startPos) + Math.abs(endPos)) / (scrollAmount / scrollDelay);

    if (this.#currentAnimation) {
      this.#currentAnimation.cancel();
    }
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
      direction: this.attrs.behavior === 'alternate' ? 'alternate' : 'normal',
      iterations: this.#iterations,
      fill: 'forwards'
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
   *
   * @param  key
   */
  attributeChangedCallback (key) {
    console.log(key);
    this.#updateScroll();
  }
}
