
import Prisma from "../prisma";
import { Calculation } from "../types/types";
import LocalData from "./LocalData";
import ReductPrism from "./ReductPrism";
import UIDetails from "./UI/UIDetails";
import UIDiv from "./UI/UIDiv";
import Vector from "./Vector";
import VectorDisplay from "./VectorDisplay";

export default class SideBar {
  private _element:HTMLElement;
  private _dataArray:Calculation[];
  private _details!:UIDetails;
  private _width:number = 220;
  private _vectorDisplay!:VectorDisplay;
  private _drp!:ReductPrism;
  private _responceUIElement!:UIDiv;

  constructor(selector:string) {
    const element = document.querySelector(selector);
    if(element === null) throw new Error(`No element found using selector '${selector}'`);
    this._element = element as HTMLElement;
    this._element.style.position = 'absolute';
    this._element.style.width = `${this._width}px`;
    this._element.style.left = `-${this._width}px`;
    this._dataArray = LocalData.load();
    this._init();    
  }

  public redrawElement() {
    this._dataArray = LocalData.load();
    this._init();
  }

  private _init(){
    this._element.innerHTML = '';
    this._dataArray.forEach((comp, index) => this._element.append(this._component(comp, index)))
  }

  private MouseClickEvent( e:MouseEvent) {
    e.stopPropagation();
    const d = e.target as HTMLImageElement
    const sum = d.parentElement;
    if(sum && sum.parentElement){
      // @ts-ignore
      sum.parentElement.onmouseenter = undefined;
      // @ts-ignore
      sum.parentElement.onmouseleave = undefined;
    }
    
    const og = sum?.parentElement?.getAttribute('og-name');

    const input = document.createElement('input');  
    input.onkeydown = this._keyDown.bind(this);
    // get the key pressed >> enter of tab
    // set attribute og-name to the new data.
    // remove the input and restore the mouseEnter & mouseLeave Events
    // update the array and write to de localstorage 
    // @ts-ignore
    input.placeholder = og;
    // @ts-ignore
    sum.innerHTML = '';
    // @ts-ignore
    sum.append(input);    
  }

  private _keyDown(e:KeyboardEvent):void {
    const target = e.target as HTMLInputElement;
    
    let index = 0;
    if(target.parentElement && target.parentElement.parentElement){
      // @ts-ignore
      index = parseInt( target.parentElement.parentElement.getAttribute('index'), 10);
    }
    if(e.key === 'Tab' || e.key === 'Enter'){
      // console.log('target:', target.value);
      const curr = this._dataArray[index];
      curr.name = target.value;
      this._dataArray[index] = curr;
      LocalData.saveAll(this._dataArray);
      this._init();
    }
  }

  private _deleteCalculation(e:MouseEvent):void {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    console.log(target.parentElement?.parentElement?.parentElement);
    let index = 0;
    if(target.parentElement 
      && target.parentElement.parentElement
      && target.parentElement.parentElement.parentElement)
    {
      index = parseInt( target.parentElement.parentElement.parentElement.getAttribute('index') as string, 10);
    }

    let confirmAction = confirm("Zeker weten deze calculatie verwijderen?");
    if (confirmAction === false) {
      return;
    } else {
      this._dataArray.splice(index, 1);
      LocalData.saveAll(this._dataArray);
      this._init();
    }
  }

  private _mouseEvents(){
    const nImg = new Image(18);
    nImg.src = "/images/edit_icon.png";
    nImg.onclick = this.MouseClickEvent.bind(this);

    this._details.onMouseEnter( (e:MouseEvent) => {
      const data = e.target as HTMLDetailsElement
      if(data.childNodes[0]){
        let el = data.childNodes[0];
        // @ts-ignore
        let inner = el.innerHTML;
        const og = inner;
        if(inner.indexOf('<img') > -1) return;   
        const span = document.createElement('span');
        span.innerText = inner
        // console.log(inner, inner.indexOf('<span'));        
        if(span.innerText.indexOf('<span') < 0){
           inner = span;
        }
        // console.log(inner);
        data.setAttribute('OG-name', og)
        el.appendChild(nImg);
      }
    });

    this._details.onMouseLeave( (e:MouseEvent) => {
      const data = e.target as HTMLDetailsElement
      if(data.childNodes[0]){
        const inner = data.getAttribute('OG-name');        
        // console.log(inner);     
        // @ts-ignore 
        data.childNodes[0].innerText = '';
        const el = `${inner}`;
        // console.log(data.childNodes[0]);
        // @ts-ignore
        (data.childNodes[0] as NodeJS).innerHTML = el;
      }
    });
  }

  public setVectorDisplay(vectorDisplay:VectorDisplay):void {
    this._vectorDisplay = vectorDisplay;
  }

  public setReductPrism(drp:ReductPrism):void {
    this._drp = drp;
  }

  public setResponceUIElement(element:UIDiv):void {
    this._responceUIElement = element;
  }

  private _componentClicked(e:MouseEvent):void {
    // console.log('target:', e.target);
    const target = e.target as HTMLElement;
    const container = target.parentElement?.parentElement?.parentElement?.parentElement;
    const indexStr = container?.getAttribute('index') as string;
    const index = parseInt(indexStr, 10);
    const calc = this._dataArray[index];

    const p1 = new Prisma(calc.prisma1, calc.ax1);
    const p2 = new Prisma(calc.prisma2, calc.ax2);
    const p3 = p1.add(p2.vector);

    this._vectorDisplay.resetCanvas();
    this._vectorDisplay.drawVector(p1.vector);
    this._vectorDisplay.drawVector(p2.vector);
    this._vectorDisplay.drawVector(p3.vector);

    if(calc.add) {
      this._drp.setTypeDRP(calc.type as string);
      const dDrp = new Prisma(this._drp.getDRP(calc.add), 270);
      const out = p3.add(dDrp.vector);
      this._vectorDisplay.drawVector(dDrp.vector);
      this._vectorDisplay.drawVector(out.vector);
      // console.log('DRP:', dDrp.strength, dDrp.axes);
    }
    if(p3.axes < 0)
      this._responceUIElement.addInnerText(`Result: ${p3.strength.toFixed(2)} - angle: ${(360 + p3.axes).toFixed(1)}`);
    else 
      this._responceUIElement.addInnerText(`Result: ${p3.strength.toFixed(2)} - angle: ${ p3.axes.toFixed(1)}`);

  }

  private _component(data:Calculation, index:number):HTMLElement {
    // console.log(data);
    const _data = {...data};
    
    const img = new Image(18);
    img.src = "/images/trashcan.png";
    img.style.position = 'absolute';
    img.style.right = '5px';
    img.style.bottom = '5px';
    img.onclick = this._deleteCalculation.bind(this);

    this._details = new UIDetails(`name: ${_data.name!}`);
    this._details.HTMLElement.classList.add('sidebar-details');
    this._details.HTMLElement.setAttribute('index', index.toString());
    
    this._mouseEvents();
    this._details.appendHTMLElement(this._keyValueElement('name', _data.name as string));
    delete _data.name;
    let key: keyof typeof _data;
    const comp = document.createElement('div');
    comp.style.position = 'relative';
    comp.style.marginLeft = '5px';
    comp.style.padding = '10px';
    comp.style.backgroundColor = 'gray';
    comp.onclick = this._componentClicked.bind(this);
    for (key in _data) {
      if(data[key] === undefined || key === 'type') continue;        
      comp.append(this._keyValueElement(key, _data[key] as string | number))
    }
    comp.append(img);
    this._details.appendHTMLElement(comp);
    
    return this._details.HTMLElement;
  }

  private _keys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

  private _keyValueElement(key:string, value:string|number):HTMLElement {
    const comp = document.createElement('div');
    const keyComp = document.createElement('span');
    keyComp.innerText = `${key}:`;
    const valueComp = document.createElement('span');
    valueComp.innerText = value.toString();
    comp.append(keyComp, valueComp);
    return comp;
  }

}