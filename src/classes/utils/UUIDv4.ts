export default class UUIDv4{
  private static generateNumber(limit:number):number {
	   var value = limit * Math.random();
	   return value | 0;
   }
	private static generateX():string {
		var value = UUIDv4.generateNumber(16);
		return value.toString(16);
   }
	private static generateXes(count:number):string {
		var result = '';
		for(var i = 0; i < count; ++i) {
			result += UUIDv4.generateX();
		}
		return result;
  }
	private static generateVariant():string {
		var value = UUIDv4.generateNumber(16);
		var variant =  (value & 0x3) | 0x8;
		return variant.toString(16);
	}

	/**
	 * generate a UUID v4 string
	 * version: M=4 
   * variant: N
	 * return string : pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
	 */
	public static generate():string {
  	    var result = this.generateXes(8)
  	         + '-' + this.generateXes(4)
  	         + '-' + '4' + this.generateXes(3)
  	         + '-' + this.generateVariant() + this.generateXes(3)
  	         + '-' + this.generateXes(12)
  	    return result;
	};
};