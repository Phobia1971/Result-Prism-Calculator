import UIBase from "./base/UIbase";

export default class UIContainer extends UIBase {
  constructor(name?:string){
    super('div', name || 'container');
  }

}