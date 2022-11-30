import UIBase from "./base/UIbase";
import UIDiv from "./UIDiv";

export default class UIDetails extends UIBase {
  private _summaryElement:HTMLElement;
  private _displayElement:UIDiv;
  constructor(summary:string){
    super('details', summary || 'details');
    this._summaryElement = document.createElement('summary');
    this._summaryElement.setAttribute('contenteditable', 'false');
    this._summaryElement.innerText = summary;
    this._displayElement = new UIDiv();
    this._displayElement.addInnerText('placeholder text...'); 
    this.currentElement.append(this._summaryElement);
    this.currentElement.append(this._displayElement.HTMLElement);
  }  

  appendUIElement(UIInstance:UIBase){
    this._displayElement.HTMLElement.innerHTML = '';
    this._displayElement.appendUIElement(UIInstance);
  }

  appendHTMLElement(UIElement:HTMLElement){
    this._displayElement.HTMLElement.innerHTML = '';
    this._displayElement.appendHTMLElement(UIElement);
  }

  addStyleText(styleMap:Map<string,string>):void
  addStyleText(property:string, value:string):void 
  addStyleText(arg1:any, arg2?:string):void {
    if(typeof(arg1) === 'string')
    this._displayElement.HTMLElement.style[arg1 as any] = arg2 as string;
    else {
      const styles = arg1 as Map<string,string>;
      styles.forEach( (value, key) => {
        this._displayElement.HTMLElement.style[key as any] = value;
      })
    }
  }

  addStyleHeader(styleMap:Map<string,string>):void
  addStyleHeader(property:string, value:string):void 
  addStyleHeader(arg1:any, arg2?:string):void {
    if(typeof(arg1) === 'string')
    this._summaryElement.style[arg1 as any] = arg2 as string;
    else {
      const styles = arg1 as Map<string,string>;
      styles.forEach( (value, key) => {
        this._summaryElement.style[key as any] = value;
      })
    }
  }

  public set innerText(v : string) {
    this._displayElement.addInnerText(v);
  }
  
  public set summaryText(v : string) {
    this._summaryElement.innerText = v;
  }
  
  public get summaryText() : string {
    return this._summaryElement.innerText;
  }
  
  public get innerText() : string {
    return this._displayElement.HTMLElement.innerText;
  }

  public openMe():void {
    const current = this.currentElement as HTMLDetailsElement;
    
    if(!current.open){
      current.open = true;
    }
  }

  public onMouseEnter(callback:(e:MouseEvent) => void):void {
    this.currentElement.onmouseenter = callback;
  }

  public onMouseLeave(callback:(e:MouseEvent) => void):void {
    this.currentElement.onmouseleave = callback;
  }

  public closeOthers():void {
    [...document.getElementsByTagName("details")].forEach( (D,_,A) =>
      D.addEventListener("toggle", E =>
        D.open && A.forEach(d =>
          d!=E.target && (d.open=false)
        )
      )
    )
  }
}