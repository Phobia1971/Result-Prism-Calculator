export interface Point {
  x:number;
  y:number;
}

export interface Calculation {
  prisma1:number,
  ax1:number,
  prisma2:number,
  ax2:number,
  add?:number,
  type?:string,
  name?:string,
  date:string,
  time:string,
}

export enum Color {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  WHITE = 'white',
  BLACK = 'black',
  GREY = 'grey',
  MIDDLEGREY = '#2d2d2d',
  DARKGREY = '#141414',
}

export enum DRP {
  'E2/3' = 2/3,
  'E1/3' = 1/3,
  'H1/3' = 1/3,
  'N1/2' = 1/2,
  'B2/3' = 2/3,
}

export interface VendorDrp {
  vendor:string,
  drpStr:string,
  drp:DRP;
  desc:string,
}

export enum  Types {
  color = 'color',
  date = 'date',
  datetime = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
}