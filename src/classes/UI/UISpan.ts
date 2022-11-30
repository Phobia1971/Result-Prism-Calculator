import UIBase from "./base/UIbase";

export default class UISpan extends UIBase {
  constructor(name?:string){
    super('span', name || 'span');
  }
    
  addInnerText(text:string){
    this.currentElement.innerText = text;
  }
}