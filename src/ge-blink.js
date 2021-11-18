import { geoExtendElement } from "./ge-shared.js";

export default class GeoElementBlink extends geoExtendElement('ge-blink'){
  #slotElement;
  #styleElement;
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.#slotElement = this.cE('slot');
    this.#styleElement = this.cE('style');
    this.#styleElement.textContent = `slot{animation: 2s linear infinite condemned_blink_effect;}@keyframes condemned_blink_effect {0% {visibility: hidden;}50% {visibility: hidden;}100% {visibility: visible;}}@media (prefers-reduced-motion) {slot {animation:none;}}`;
    this.shadowRoot.append(this.#slotElement,this.#styleElement);
  }
}