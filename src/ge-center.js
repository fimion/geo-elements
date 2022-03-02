import { geoExtendElement } from "./ge-shared.js";

export default class GeoElementCenter extends geoExtendElement('ge-center'){
  #slotElement;
  #styleElement;
  constructor(){
    super();
    this.#slotElement = this.cE('slot');
    this.#styleElement = this.cE('style');
    this.#styleElement.textContent = 'slot{display:block; text-align:center}';
    this.shadowRoot.append(this.#slotElement,this.#styleElement);
  }
}
