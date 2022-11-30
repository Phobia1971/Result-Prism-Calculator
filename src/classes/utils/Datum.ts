export default class Datum {
  public static nu():string {
      const today = new Date();
    return this._formatDate(today, 'dd-mm-yyyy');
  }

  public static tijd():string {
    const today = new Date();
       // current hours
    const hours = today.getHours();
    // current minutes
    const minutes = ("0" + (today.getMinutes() + 1)).slice(-2);
    // current seconds
    const seconds = ("0" + (today.getSeconds() + 1)).slice(-2);
  
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return hours + ":" + minutes + ":" + seconds;
  }

  private static _formatDate(date:Date, format:string):string {
    const map = {
      mm: ("0" + (date.getMonth() + 1)).slice(-2),
      dd: ("0" + date.getDate()).slice(-2),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear()
    };
    // @ts-ignore
    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
  }
}