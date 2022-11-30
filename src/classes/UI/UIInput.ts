import { Types } from "../../types/types";
import UIBase from "./base/UIbase";


export default class UIInput extends UIBase {
  private _input:HTMLInputElement;
  private _label:HTMLLabelElement;
  private _type:string;

  constructor(type:Types = Types.text,name?:string){
    super('div', name || 'input');
    this._type = type;
    
    this._input = document.createElement('input');
    this._label = document.createElement('label');
    this._label.setAttribute('for', this.uuid);
    this._label.innerText = this.name;

    this._input.setAttribute("type", this._type);
    this._input.id = this.uuid;
    this.currentElement.append(this._label, this._input);
    // this.currentElement.innerText = name || 'button';
  }

  
  public get Text() : string {
    return this._input.value;
  }

  public set PlaceHolder(v : string) {
    this._input.placeholder = v;
  }
  
  clear():void {
    this._input.value = '';
  }

  setLabelText(text:string):void {
    if(this._label === undefined) throw new Error("Cannot set label text because there is no label element present...");
    this._label.innerText = text;
  }

  addAttribute(attributes:Map<string,string>):void
  addAttribute(attributes:string, value:string):void
  addAttribute(arg1:any, arg2?:string):void {
    if(typeof(arg2) === 'string'){
      this._input.setAttribute(arg1, arg2);
    } else {
      const attributes = arg1 as Map<string,string>;
      attributes.forEach((value, attribute) => {
        this._input.setAttribute(attribute, value);
      })
    }
  }

  addLabelStyle(styleMap:Map<string,string>):void
  addLabelStyle(property:string, value:string):void 
  addLabelStyle(arg1:any, arg2?:string):void {
    if(typeof(arg1) === 'string')
      this._label.style[arg1 as any] = arg2 as string;
    else {
      const styles = arg1 as Map<string,string>;
      styles.forEach( (value, key) => {
        this._label.style[key as any] = value;
      })
    }
  }

  addInputStyle(styleMap:Map<string,string>):void
  addInputStyle(property:string, value:string):void 
  addInputStyle(arg1:any, arg2?:string):void {
    if(typeof(arg1) === 'string')
      this._input.style[arg1 as any] = arg2 as string;
    else {
      const styles = arg1 as Map<string,string>;
      styles.forEach( (value, key) => {
        this._input.style[key as any] = value;
      })
    }
  }

  setLabelAfterInput(){
    this.currentElement.innerHTML = '';
    this.currentElement.append(this._input, this._label);
  }

  onClick(callback:(e:MouseEvent) => void):void {
    this.currentElement.onclick = callback;
  }

  onKeyDown(callback:(e:Event) => void):void {
    this.currentElement.onkeydown = callback;
  }

  onKeyUp(callback:(e:Event) => void):void {
    this.currentElement.onkeyup = callback;
  }

  addLabelClass(classname:string):void {
    this._label.classList.add(classname);
  }

  addInputClass(classname:string):void {
    this._input.classList.add(classname);
  }

  removeLabelClass(classname:string):void {
    this._label.classList.remove(classname);
  }
  
  removeInputClass(classname:string):void {
    this._input.classList.remove(classname);
  }
}