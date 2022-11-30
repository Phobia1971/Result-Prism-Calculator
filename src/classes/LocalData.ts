import { Calculation } from "../types/types";

export default class LocalData {

  constructor(){}

  public static load():Calculation[]{
    const all = localStorage.getItem('calculations');
    if(all){
      const arr = JSON.parse(all);
      return arr;
    }
    return []
  }

  public static save(calculation:Calculation):void {
    const all = this.load();
    if(!calculation.name){
      if(all[all.length].name){
        const index = parseInt(all[all.length].name as string, 10);
        calculation.name =(index +1).toString();
      }
    }
    all.push(calculation);
    if(all.length > 20) all.shift();
    localStorage.setItem('calculations', JSON.stringify(all));
  }

  public static saveAll(calculations:Calculation[]):void {
    localStorage.setItem('calculations', JSON.stringify(calculations));
  }
}