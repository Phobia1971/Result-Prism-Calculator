import UIBase from "./base/UIbase";

export default class UICheckbox extends UIBase {
  private _checkbox:HTMLInputElement;
  private _label:HTMLLabelElement;
  constructor(name?:string){
    super('div', name || 'checkbox');
    this._checkbox = document.createElement('input');
    this._label = document.createElement('label');
    this._label.setAttribute('for', this.uuid);
    this._label.innerText = this.name;

    this._checkbox.setAttribute("type", "checkbox");
    this._checkbox.id = this.uuid;
    this.currentElement.append(this._label, this._checkbox);
    // this.currentElement.innerText = name || 'button';
  }

  setLabelText(text:string):void {
    if(this._label === undefined) throw new Error("Cannot set label text because there is no label element present...");
    this._label.innerText = text;
  }

  
  public set checked(v : boolean) {
    this._checkbox.checked = v;
  }
  
  public get checked() : boolean {
    return this._checkbox.checked;
  }
  
  
  setChecked():void {
    this._checkbox.checked = true;
  }

  public get Checked():boolean { return this._checkbox.checked; }

  toggleState():void {
    this._checkbox.checked = !this._checkbox.checked;
  }

  addLabelStyle(property:string, value:string):void {
    this._label.style[(property as any)] = value;
  }

  addCheckboxStyle(property:string, value:string):void {
    this._checkbox.style[(property as any)] = value;
  }

  setLabelAfterCheckbox(){
    this.currentElement.innerHTML = '';
    this.currentElement.append(this._checkbox, this._label);
  }

  onClick(callback:(e:MouseEvent) => void):void {
    this.currentElement.onclick = callback;
  }

  onInput(callback:(e:Event) => void):void {
    this._checkbox.oninput = callback;
  }

  addLabelClass(classname:string):void {
    this._label.classList.add(classname);
  }

  addCheckboxClass(classname:string):void {
    this._checkbox.classList.add(classname);
  }

  removeLabelClass(classname:string):void {
    this._label.classList.remove(classname);
  }
  
  removeCheckboxClass(classname:string):void {
    this._checkbox.classList.remove(classname);
  }
}