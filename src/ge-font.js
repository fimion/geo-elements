import { geoExtendElement, parseCSSList, parseSimpleColor } from "./ge-shared.js";

export default class GeoElementFont extends geoExtendElement(
  "ge-font",
  HTMLElement,
  { attrs: ["face", "color", "size"] }
) {
  #links;
  #slot;
  #styleElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#links = new DocumentFragment();

    this.#slot = this.cE("slot");
    
    this.#styleElement = this.cE("style");
    this.#updateStyles();
    document.head.appendChild(this.#links);
    this.shadowRoot.append(this.#styleElement, this.#slot);
    
  }
  
  attributeChangedCallback(){
    this.#updateStyles();
  }
  
  

  #createStyleLink(href) {
    const link = this.cE("link");
    link.rel = "stylesheet";
    link.href = href;
    return link;
  }

  #updateStyles() {
    const face = parseCSSList(this.getAttribute("face") || "");
    face.forEach((fontName) => {
      if(fontName === "") return;
      if (!document.fonts.check(`1rem ${fontName}`)) {
        const googleFont = encodeURI(fontName.replaceAll(/(^\'|\'$)/g,'')).replaceAll('%20','+');
        this.#links.prepend(
          this.#createStyleLink(
            `https://fonts.googleapis.com/css2?family=${googleFont}&display=swap`
          )
        );
      }
    });
    
    const fontFamily = face.length ? `font-family:${face.join(",")};`:'';
    const parsedColor = parseSimpleColor(this.getAttribute('color'),undefined);
    const color = parsedColor? `color:${parsedColor};`:'';
    const SIZES = ['0.5rem','0.75rem','1rem','1.5rem','2rem','2.5rem','3rem'];
    let sizeAttr;
    try{
      sizeAttr = parseInt(this.getAttribute('size'))-1;
      if(sizeAttr < 0){
        sizeAttr = 2;
      }else if(sizeAttr > 6){
        sizeAttr = 2;
      }
    }catch(e){
      e.preventDefault();
      sizeAttr = 2;
    }
    if(Number.isNaN(sizeAttr)){
      sizeAttr=2;
    }
    
    const size = SIZES[sizeAttr];

    this.#styleElement.textContent = `:host{font-size:${size};${fontFamily}${color}}`;
  }
  
  
}
