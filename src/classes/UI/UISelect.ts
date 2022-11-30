import UIBase from "./base/UIbase";

export default class UISelect extends UIBase {
  private _select:HTMLSelectElement;
  private _label:HTMLLabelElement;
  constructor(name?:string){
    super('div', name || 'select');
    this._select = document.createElement('select');
    this._select.id = this.uuid;
    this._label = document.createElement('label');
    this._label.setAttribute('for', this.uuid);
    this._label.innerText = this.name;

    this.currentElement.append(this._label, this._select);
    // this.currentElement.innerText = name || 'button';
  }

  setLabelText(text:string):void {
    if(this._label === undefined) throw new Error("Cannot set label text because there is no label element present...");
    this._label.innerText = text;
  }

  addLabelStyle(property:string, value:string):void {
    this._label.style[(property as any)] = value;
  }

  addOption(text:string, value:string):void {
    const op = document.createElement('option');
    if(op === undefined) throw new Error("failed to create an new option element....");
    op.value = value;
    op.innerText = text;
    this._select.append(op);
  }

  addSelectStyle(property:string, value:string):void {
    this._select.style[(property as any)] = value;
  }

  setLabelAfterCheckbox(){
    this.currentElement.innerHTML = '';
    this.currentElement.append(this._select, this._label);
  }
  
  /**
   * Use to trigger when value of the dropdown has changed
   * to trigger the callback function
   * @param  {(e:Event)=>void} callback
   * @returns void
   */
  onInput(callback:(e:Event) => void ):void {
    this._select.oninput = callback;
  }
  /**
   * Use when the element is clicked on to trigger the callback function
   * @param  {(e:MouseEvent)=>void} callback
   * @returns void
   */
  onClick(callback:(e:MouseEvent) => void):void {
    this._select.onclick = callback;
  }

  addLabelClass(classname:string):void {
    this._label.classList.add(classname);
  }

  addSelectClass(classname:string):void {
    this._select.classList.add(classname);
  }

  removeLabelClass(classname:string):void {
    this._label.classList.remove(classname);
  }
  
  removeSelectClass(classname:string):void {
    this._select.classList.remove(classname);
  }
}