import { geoExtendElement } from "./ge-shared.js";

const MARQUEE_ATTRS = {
  "behavior": "scroll",
  "bgcolor": "transparent",
  "direction": "left",
  "height":"auto",
  "hspace": 0,
  "loop": -1,
  "scrollamount": 6,
  "scrolldelay": 85,
  "truespeed": false,
  "vspace": 0,
  "width": "auto",
};


export default class GeoElementMarqee extends geoExtendElement(
  "ge-marquee",
  HTMLElement,
  { attrs: Object.keys(MARQUEE_ATTRS) }
  ){

  #styleElement;
  #divElement;
  #currentAnimation;

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
    width: -webkit-fill-available;
    max-width: 100%;
    }
    :host([direction="up"]), :host([direction="down"]) {
    overflow: initial;
    overflow-y: hidden;
    white-space: initial;
    }
    `;
    this.#divElement = this.cE('div');
    this.#divElement.append(this.cE('slot'))
    this.shadowRoot.append(this.#styleElement, this.#divElement);
    this.#currentAnimation = null;
  }

  #getScrollWidth(){
    const div = this.cE('div');
    div.innerText = this.innerText;
    this.shadowRoot.append(div);
    const mySize = div.scrollWidth;
    this.shadowRoot.removeChild(div);
    return mySize;
  }

  #updateScroll(){



    const scrollAmount = Number(this.getAttribute("scrollamount")) || MARQUEE_ATTRS.scrollamount;
    const trueSpeed = typeof this.getAttribute("truespeed") === "string";
    const tempDelay = Number(this.getAttribute("scrolldelay")) ||  MARQUEE_ATTRS.scrolldelay;
    let scrollDelay = tempDelay;

    if(!trueSpeed){
      if(tempDelay < 60) {
        scrollDelay = 60;
      }
    }

    let start,end, duration;

    const dirAttr = this.getAttribute("direction");
    const direction = ["left","right","up","down"].includes(dirAttr)? dirAttr : "left";
    switch(direction){
      case "up":{
        start = `translateY(${this.offsetHeight}px)`;
        end = `translateY(-${this.offsetHeight}px)`;
        duration = (this.offsetHeight*2)/(scrollAmount/scrollDelay);
        break;
      }
      case "down":{
        start = `translateY(-${this.offsetHeight}px)`;
        end = `translateY(${this.offsetHeight}px)`;
        duration = (this.offsetHeight*2)/(scrollAmount/scrollDelay);
        break;
      }
      case "right":{
        const width = this.#getScrollWidth()
        end = `translateX(${this.offsetWidth}px)`;
        start = `translateX(-${width}px)`;
        duration = (this.offsetWidth+width)/(scrollAmount/scrollDelay);
        break;
      }
      case "left":
      default: {
        const width = this.#getScrollWidth()
        start = `translateX(${this.offsetWidth}px)`;
        end = `translateX(-${width}px)`;
        duration = (this.offsetWidth+width)/(scrollAmount/scrollDelay);
        break;
      }
    }
    if(this.#currentAnimation) this.#currentAnimation.cancel();
    this.#currentAnimation = this.#divElement.animate([
          {transform: start},
          {transform: end},
        ],
        {
          duration,
          iterations: Infinity,
        });
  }
  connectedCallback(){
    this.#updateScroll();
  }
  attributeChangedCallback(key){
    this.#updateScroll();
  }
}
