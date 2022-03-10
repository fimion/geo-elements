import { geoExtendElement, parseCSSList, parseSimpleColor } from "./ge-shared.js";

export default class GeoElementFont extends geoExtendElement(
  "ge-font",
  HTMLElement,
  { attrs: ["face", "color", "size"] }
) {
  #links;
  constructor() {
    super();
    this.#links = this.jj.style;
    this.#updateStyles();
    document.head.appendChild(this.#links);
  }

  attributeChangedCallback(){
    this.#updateStyles();
  }

  #createStyleLink(href) {
    return `@import url(${href});`;
  }

  #updateStyles() {
    const face = parseCSSList(this.attrs.face);
    const imports = [];
    face.forEach((fontName) => {
      if(fontName === "") return;

      if (!document.fonts.check(`1rem ${fontName}`)) {
        const googleFont = encodeURI(fontName.replaceAll(/(^\'|\'$)/g,'')).replaceAll('%20','+');
        imports.push(
          this.#createStyleLink(
            `https://fonts.googleapis.com/css2?family=${googleFont}&display=swap`
          )
        );
      }
    });

    this.#links.textContent = imports.join('');

    const fontFamily = face.length ? `font-family:${face.join(",")};`:'';
    const parsedColor = parseSimpleColor(this.attrs.color,undefined);
    const color = parsedColor? `color:${parsedColor};`:'';
    const SIZES = ['0.5rem','0.75rem','1rem','1.5rem','2rem','2.5rem','3rem'];
    let sizeAttr;
    try{
      sizeAttr = parseInt(this.attrs.size)-1;
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
      sizeAttr = 2;
    }

    const size = SIZES[sizeAttr];

    this.css`
      :host{
        font-size:${size};
        ${fontFamily}${color}
      }`;
  }


}
