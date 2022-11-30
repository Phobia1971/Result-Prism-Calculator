import { Color, Point } from "../types/types";
import Vector from "./Vector";

export default class VectorDisplay {
  private _canvas:HTMLCanvasElement;
  private _width:number;
  private _height:number;
  private _ctx:CanvasRenderingContext2D;
  private _zero:Point;
  private _colors:Color[] = [Color.RED, Color.GREEN, Color.BLUE];
  private _colorIndex:number = 0;
  private _vectors:Map<string,Vector> = new Map();
  private _locs:Point[] = [];
  private _multiplier:number | undefined;
  private _doReDraw:boolean = false;
  private _showBounds:boolean = false;
  private _mode:string = 'dark';

  constructor(CanvasID:string, width:number = 300, height:number = 300 ) {
    const canvas = document.getElementById(CanvasID);
    if(!canvas) throw new Error(`'${CanvasID}' is not a valid elementID`);
    
    this._canvas = canvas as HTMLCanvasElement
    this._width = this._canvas.width = width;
    this._height = this._canvas.height = height;

    this._zero = {
      x: this._width/2,
      y: this._height/2,
    }

    const ctx = this._canvas.getContext('2d')
    if(ctx === null) throw new Error("No 2d context found!!!");    
    this._ctx = ctx

    if(this._mode !== 'dark'){
      this._ctx.fillStyle = Color.WHITE;
      this._ctx.fillRect(0,0,this._width, this._height);
    }
    this._drawX()
  }

  
  public set showBorders(v : boolean) {
    this._showBounds = v;
    this._reDraw();
  }
  


  public resetCanvas():void {
    this._colorIndex = 0
    this._doReDraw = false;
    this._multiplier = undefined;
    this._vectors.clear();
    this._locs = [];
    this._ctx.clearRect(0, 0, this._width, this._height);
    
    this._drawX();
    // console.log('Canvas has been reset...');
  }

  public forceRedraw():void {
    this._reDraw();
  }

  private _drawX():void {
    
    // this._ctx.moveTo(x, y);
    this._ctx.beginPath();
    this._ctx.lineWidth = 1;
    this._ctx.moveTo(this._zero.x, 0);
    this._ctx.lineTo(this._zero.x, this._height);
    this._ctx.moveTo(0, this._zero.y);
    this._ctx.lineTo( this._width, this._zero.y);

    if(this._mode !== 'dark'){
      this._ctx.strokeStyle = Color.BLACK;
    }
    else{
      this._ctx.strokeStyle = Color.WHITE;
    }
    this._ctx.stroke();
  }

  public drawVector(vector:Vector):void {
    // only calculate multiplier is it is a new vector
    if(this._isNewVector(vector)) this._calcMultipier(vector);

    if(this._doReDraw){
      this._reDraw();
      return;
    }
    if(this._multiplier === undefined) throw new Error("ERROR unable to calculate a multiplier");
    
    const multiplier = this._multiplier;
    const x = this._zero.x + (vector.points.x * multiplier);
    const y = this._zero.y - (vector.points.y * multiplier);
    this._ctx.beginPath();
    this._ctx.moveTo(this._zero.x, this._zero.y);
    this._ctx.lineTo( x, y);
    this._drawArrow(x, y, vector.axes);
    this._locs.push({x:x, y:y});

    this._ctx.lineWidth = vector.isResult ? 4 : 2;
    
    if(vector.isResult){
      this._ctx.strokeStyle = Color.YELLOW;
    } else {

      this._ctx.strokeStyle = this._colors[this._colorIndex];
      
      if(this._colorIndex === this._colors.length - 1) this._colorIndex = 0;
      else this._colorIndex += 1;
    }
    this._ctx.stroke();
    this._drawBounds();
  }

  private _drawArrow(x:number, y:number, angle:number):void {    
    const vc1 = new Vector(15, angle + 20);
    const vc2 = new Vector(15, angle - 20);
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x - vc1.points.x , y + vc1.points.y);
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x - vc2.points.x , y + vc2.points.y);
  }

  private _drawBounds():void {
    if(this._showBounds === false) return;
    if(this._locs.length %2 !== 0) return
    
    for (let index = 0; index < this._locs.length; index += 2) {
      const loc1 = this._locs[index];
      const loc2 = this._locs[index + 1];
      this._ctx.beginPath();
      
      this._ctx.moveTo(loc1.x, loc1.y);
      this._ctx.lineTo(loc2.x + (loc1.x - (this._width/2)), loc1.y + ( loc2.y - (this._height/2) ));

      this._ctx.moveTo(loc2.x, loc2.y);
      this._ctx.lineTo(loc1.x + (loc2.x - (this._height/2)),  loc1.y + ( loc2.y - (this._height/2) ) );
      
      this._ctx.strokeStyle = Color.MIDDLEGREY;
      this._ctx.lineWidth = 2;
      this._ctx.stroke();
    }
  }

  private _reDraw(){
    this._doReDraw = false;
    // console.log('Redraw canvas: Start');
    this._locs = [];
    this._ctx.clearRect(0, 0, this._width, this._height);
    if(this._mode !== 'dark'){
      this._ctx.fillStyle = Color.WHITE;
      this._ctx.fillRect(0,0,this._width, this._height);
    }
    this._drawX()
    this._vectors.forEach( v => this.drawVector(v));
    // console.log('Redraw canvas: Done');
  }

  private _calcMultipier(vector:Vector):void {
    const maxMultiplier = (this._width/ 2) * 0.9;
    const mX = Math.abs(Math.floor(maxMultiplier / vector.points.x));
    const mY = Math.abs(Math.floor(maxMultiplier / vector.points.y));
    const mP = mX > mY ? mY : mX
    if(!this._multiplier || mP < this._multiplier -10){
      if(this._multiplier) this._doReDraw = true;
      this._multiplier = mP;      
    }    
  }

  private _isNewVector(vector:Vector):boolean {
    const added = !this._vectors.has(vector.uuid);
    if(added === true) this._vectors.set(vector.uuid, vector);
    return added;
  }
}