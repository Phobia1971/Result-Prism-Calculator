export default class Store {
  private static _prefix = 'hangman_'; 

  
  /**
   * load takes a string to get data from the localstorage,
   * if failed it will return -1;
   * @param  {string} key
   * @return {number|string|object} : number, string or Json object, -1 if not found
   */
  public static load(key:string):number|string|object {
    let value:number|string|object = -1;
    const data = localStorage.getItem(this._prefix + key.toLowerCase());
    if(data !== null){
      const json:boolean|object = Store._isJson(data);
      if(json === false){
        value = parseInt(data, 10);
        if(isNaN(value)) value = data;
      } else value = json as object;
    }
    return value;
  }

  /**
   * save
   */
  public static save(key:string, data:number|string):void {
    localStorage.setItem(this._prefix + key.toLowerCase(), `${data}`);
  }

  private static _isJson(str:string):boolean|object {
    let data:boolean|object = false;
    try {
         data = JSON.parse(str);
    } catch (_e) {
        data = false;
    }
    return data;
  }
}