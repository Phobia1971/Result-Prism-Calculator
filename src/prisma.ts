import Vector from "./classes/Vector";

export default class Prisma {
  private _vector: Vector;

  constructor(strength:number, axes:number, isResult:boolean = false){
    this._vector = new Vector(strength, axes, isResult);
  }

  
  public get strength() : number {
    return this._vector.strength;
  }

  
  public get axes() : number {
    return this._vector.axes;
  }

  
  public get vector() : Vector {
    return this._vector;
  }
  
  
  public add(vector:Vector):Prisma {
    const d = this._vector.Add(vector);
    return new Prisma(d.strength, d.axes, d.isResult);
  }
};