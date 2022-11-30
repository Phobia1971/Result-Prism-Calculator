import { DRP } from "../types/types";

export default class ReductPrism {
  private _type!:string;
  private _factor:number = 0;
  private _hasMax:boolean = false;

  constructor() {
    this.setTypeDRP('E2/3')
  }

  
  public get type() : string {
    return this._type;
  }
  

  public setTypeDRP(type:string):void {
    this._type = type;
    this._factor = DRP[this._type as any] as unknown as number;
    this._hasMax = this._type[0] === 'H' ? true : false;    
  }

  public getDRP(addition:number):number {
    let drp = this._factor * addition;
    if(this._hasMax && drp > 1) drp = 1;
    return drp;
  }
}