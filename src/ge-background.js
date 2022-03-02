import { geoExtendElement, parseSimpleColor } from "./ge-shared.js";
import styles from './ge-background.scss';
class GeoElementBackground extends geoExtendElement(
  "ge-background",
  HTMLElement,
  { attrs: ["background", "bgcolor", "alt"] }
) {
  #wrapper;
  #styleElement;
  #a11y;

  constructor() {
    super();
    this.#wrapper = this.cE("slot");
    // this.#wrapper.classList.add("background");
    // add our magical description div
    this.#a11y = this.cE("div");
    // this.#wrapper.append(this.#a11y);

    this.#styleElement = this.cE("style");
    // this.#wrapper.append(this.cE("slot"));
    this.shadowRoot.append(this.#styleElement, this.#a11y, this.#wrapper);
  }

  #setStyle() {
    const image = (this.getAttribute("background") || "").replaceAll(
      `'`,
      encodeURI(`'`)
    ).replaceAll('\\',encodeURI('\\'));
    const color = parseSimpleColor(this.getAttribute("bgcolor"), "transparent");

    if (image !== "") {
      const alt =
        "This has a horrible background image: " +
        (this.getAttribute("alt") ||
          "A scene so horrific that it defies explanation and has driven anyone who looks at it into a deep insanity or they forgot to write an alt attribute. Sorry.");
      this.#a11y.setAttribute("role", "img");
      this.#a11y.setAttribute("aria-label", alt);
    } else {
      this.#a11y.removeAttribute("role");
      this.#a11y.removeAttribute("aria-label");
    }

    this.#styleElement.textContent = this.__templateStyle({image, color}, styles);
  }

  attributeChangedCallback() {
    this.#setStyle();
  }
}

export default GeoElementBackground;
