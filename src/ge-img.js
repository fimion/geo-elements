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

export default class GeoElementImage extends geoExtendElement(
  'ge-img',
  HTMLElement,
  { attrs: IMG_ATTRS, noSlot: true }
) {
  #image;
  #placeHolder;

  static #promiseList = [Promise.resolve()];

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

  attributeChangedCallback (attr/* , oldValue, newValue */) {
    this.updateImage();
    if (attr === 'src' || attr === 'srcset') {
      this.updateAnimation();
    }
  }

  #animationOffsetPromise (finished) {
    return new Promise((resolve) => {
      finished.then((result) => resolve(result));
    });
  }

  set #animationOffset (finished) {
    GeoElementImage.#promiseList.push(this.#animationOffsetPromise(finished));
  }

  get #animationOffset () {
    return GeoElementImage.#promiseList[GeoElementImage.#promiseList.length - 1];
  }

  updateImage () {
    IMG_ATTRS.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this.#image[attr] = this.attrs[attr];
      }
    });
  }

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
