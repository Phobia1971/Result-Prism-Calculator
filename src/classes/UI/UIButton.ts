import UIBase from "./base/UIbase";

export default class UIButton extends UIBase {
  constructor(name?:string){
    super('button', name || 'button');
    this.currentElement.innerText = name || 'button';
  }

  onClick(callback:(e:MouseEvent) => void):void {
    this.currentElement.onclick = callback;
  }
}