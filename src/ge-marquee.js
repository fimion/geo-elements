import { geoExtendElement } from "./ge-shared.js";

const MARQUEE_ATTRS = [
  "behavior",
  "bgcolor",
  "direction",
  "sizes",
  "height",
  "hspace",
  "loop",
  "scrollamount",
  "scolldelay",
  "truespeed",
  "vspace",
  "width",
];


export default class GeoElementMarqee extends geoExtendElement(
  "ge-marquee",
  HTMLElement,
  { attrs: MARQUEE_ATTRS }
  ){
  
  #styleElement;
  #divElement;
  
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.#styleElement = this.cE('style');
    this.#styleElement.textContent = `
    :host{
    display: inline-block;
    overflow: hidden;
    text-align: initial;
    white-space: nowrap;
    max-width: 100%;
    }
    `;
    this.#divElement = this.cE('div');
    this.#divElement.append(this.cE('slot'));
    this.shadowRoot.append(this.#styleElement, this.#divElement);
  }
  
  connectedCallback(){
    
    const div = this.cE('div');
    div.innerText = this.innerText;
    this.shadowRoot.append(div);
    const mySize = div.scrollWidth;
    this.shadowRoot.removeChild(div);
    this.#divElement.animate([
      {transform: `translateX(${this.offsetWidth}px)`},
      {transform: `translateX(-${mySize}px)`},
      ],
    {
      duration: (this.offsetWidth+mySize)/(6/85),
      iterations: Infinity,
    });
  }
}