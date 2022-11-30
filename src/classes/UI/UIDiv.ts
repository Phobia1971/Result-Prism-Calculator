import UIBase from "./base/UIbase";

export default class UIDiv extends UIBase {
  constructor(name?:string){
    super('div', name || 'div');
  }
    
  addInnerText(text:string){
    this.currentElement.innerText = text;
  }
}