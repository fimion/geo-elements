'use strict';

/**
 * @file    Handles CSS background properties
 * @author  Fimion
 */

import { geoExtendElement, parseSimpleColor } from './ge-shared.js';

const BACKGROUND_ATTRS = {
  background: '',
  bgcolor: 'transparent',
  alt: 'A scene so horrific that it defies explanation and has driven anyone who looks at it into a deep insanity or they forgot to write an alt attribute. Sorry.'
};


class GeoElementBackground extends geoExtendElement(
  'ge-background',
  HTMLElement,
  { attrs: BACKGROUND_ATTRS }
) {
  #a11y;

  /**
   * Constructor description.
   */
  constructor () {
    super();
    // this.#wrapper.classList.add("background");
    // add our magical description div
    this.#a11y = this.jj.span;
    // this.#wrapper.append(this.#a11y);
    // this.#wrapper.append(this.cE("slot"));
    this.shadowRoot.append(this.#a11y);
  }

  /**
   * Set style description.
   */
  #setStyle () {
    const image = (this.attrs.background).replaceAll(
      '\'',
      encodeURI('\'')
    ).replaceAll('\\', encodeURI('\\'));
    const color = parseSimpleColor(this.attrs.bgcolor, 'transparent');

    if (image !== '') {
      const alt =
        'This has a horrible background image: ' + this.attrs.alt;
      this.#a11y.setAttribute('role', 'img');
      this.#a11y.setAttribute('aria-label', alt);
    } else {
      this.#a11y.removeAttribute('role');
      this.#a11y.removeAttribute('aria-label');
    }

    this.css`
      :host {
        display:block;
      }
      :host([background]){
        background-image: url('${image}');
      }
      :host([bgcolor]){
        background-color: ${color};
      }
      :host-context(body){
        min-height: 100vh;
        min-width: 100%;
      }
      :host([inline]){
        display:inline-block;
        min-height: initial;
        min-width: initial;
      }
    `;
  }

  /**
   * Attribute changed callback description.
   */
  attributeChangedCallback () {
    this.#setStyle();
  }
}

export default GeoElementBackground;
