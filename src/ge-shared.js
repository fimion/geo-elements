// Stolen from https://stackoverflow.com/a/39597017
export const PARSE_CSS_LIST = /,(?=(?:(?:[^"']*"[^"']*")|(?:[^'"]*'[^'"]*'))*[^"']*$)/g;

export function parseCSSList(value){
  return value
    .replaceAll(PARSE_CSS_LIST, String.fromCodePoint(0))
    .replace(/;/, '')
    .split(String.fromCodePoint(0));
}

export const COLOR_PARSE_REGEX = /((^[\w]+$)|(^\#[a-f\d]{3,6}$))/i;

export function parseSimpleColor(colorString, def=undefined){
  return COLOR_PARSE_REGEX.test(colorString)?colorString:def;
}

export function geoExtendElement(elementName, nativeElement=HTMLElement, options={}){
  
  const {attrs} = options;
  
  return class extends nativeElement{
    
    cE(...args){
      return document.createElement(...args);
    }
    
    static register(customName){
      return customElements.define(customName || elementName, this, {extends:options.extends});
    }
    
    static get observedAttributes() { return attrs; }
    /**
     * 
     * @param {Object<String,String>} values 
     * @param {String} styles 
     */
    __templateStyle(values, styles){
      return Object.keys(values).reduce((output, input)=>{
        return output.replaceAll(`--templateStyle-${input}`, values[input])
      },styles)
    }
  };
}