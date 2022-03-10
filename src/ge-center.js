import { geoExtendElement } from "./ge-shared.js";

export default class GeoElementCenter extends geoExtendElement('ge-center'){
  constructor(){
    super();
    this.css`slot{display:block; text-align:center}`;
  }
}
