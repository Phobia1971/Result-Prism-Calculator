import { Point } from "../types/types";
import UUIDv4 from "./utils/UUIDv4";

export default class Vector {
  private _strength: number;
  private _axes: number;
  private _points: Point;
  private _uuid:string;
  public isResult:boolean;

  private DEG2RAD = (Math.PI * 2) / 360;
  private RAD2DEG = 360 / (Math.PI * 2)

  constructor(strength:number, axes:number, result?:boolean){
    this._strength = strength;
    this._points = {
      x:strength * Math.cos(this.DEG2RAD * axes), 
      y: strength * Math.sin(this.DEG2RAD * axes)
    };
    this._uuid = UUIDv4.generate();
    this._axes = axes;
    if(result){
      this.isResult = result;
    } else this.isResult = false
  }

    
  public get uuid() : string {
    return this._uuid;
  }
  

  public get points() : Point {
    return this._points;
  }
  

  public get strength() : number {
    return this._strength;
  }
  
  
  public get axes() : number {
    return this._axes;
  }

  public Add(vector:Vector):Vector {

    const x = this._points.x + vector.points.x;
    const y = this._points.y + vector.points.y;

    const strength = Math.sqrt((x*x)+(y*y));
    
    const angle = this.RAD2DEG * Math.atan2(y,x);

    return new Vector(strength, angle, true);
  }
}