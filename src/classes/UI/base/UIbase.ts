import UUIDv4 from "../../utils/UUIDv4";

export default class UIBase {
  protected name:string;
  protected type:string;
  protected uuid:string;
  protected currentElement:HTMLElement;

  constructor(type:string, name:string | undefined) {
    this.type = type.toLowerCase();
    this.uuid = UUIDv4.generate();
    this.name = name ? `${name}_${this.uuid}` : `${this.type}_${this.uuid}`;
    this.currentElement = document.createElement(this.type);
    this.currentElement.id = this.name;
  }

  
  public get HTMLElement() : HTMLElement {
    return this.currentElement;
  }
  

  setDataAttribute(name:string, value:string):void {
    this.currentElement.setAttribute(name, value);
  }

  getDataAttribute(name:string):string|null {
    return this.currentElement.getAttribute(name);
  }

  addStyle(styleMap:Map<string,string>):void
  addStyle(property:string, value:string):void 
  addStyle(arg1:any, arg2?:string):void {
    if(typeof(arg1) === 'string')
      this.currentElement.style[arg1 as any] = arg2 as string;
    else {
      const styles = arg1 as Map<string,string>;
      styles.forEach( (value, key) => {
        this.currentElement.style[key as any] = value;
      })
    }
  }

  appendUIElement(UIInstance:UIBase){
    this.currentElement.append(UIInstance.HTMLElement);
  }

  appendHTMLElement(UIElement:HTMLElement){
    this.currentElement.append(UIElement);
  }

  prependUIElement(UIInstance:UIBase){
    this.currentElement.prepend(UIInstance.HTMLElement);
  }

  prependHTMLElement(UIElement:HTMLElement){
    this.currentElement.prepend(UIElement);
  }

}