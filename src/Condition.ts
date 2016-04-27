import {DataTypes} from "./DataTypes";
import {Utils} from "./Utils";

export class Condition extends DataTypes.DataType {
    private condition: any;
    private conditionType: string;
    private val: boolean = true;
    private callback: Function;
    
    
    
    /**
     * Param: condition of any supported format, callback-function called when condition switches to false
     */
    constructor (condition: any, callback: Function = function() { return true; }) {
        super();
        
        this.condition = this.parse(condition);
    }
    
    
    
    /**
     * Checks whether the condition is fulfilled
     */
    isTrue():boolean {
        return this.val;
    }
    
    
    
    /**
     * Method for invalidating the condition and calling the callback method
     */
    invalidate(): void {
        this.val = false;
        this.callback();
    }
    
    
    
    /**
     * Should be called in every loop-iteration
     */
    iterate(): void {
        if (this.conditionType === "i") {
            this.condition--;
        }
        if (this.condition == 0) {
            this.invalidate();
        }
    }
    
    
    
    
    /**
	 * Parses condition of any supported format (b = Constant boolean value, t = Time in seconds, i = Iterations, C = While current Color is different)
	 */
	parse(condition: any) {
		//Compatibility
		if (typeof condition === "string") {
			condition = Utils.compatFormat(condition);
		}
		
		//Make sure that one of the supported formats is given
		Utils.assert(condition.b || condition.t || condition.i || condition.c, "Wrong format or no format given for condition: " + condition);
		
		//Needs to be splitted
		let values: number[];
		let fn: any;
		
        //static boolean value ("while true")
        if (condition.b) {
            this.conditionType = "b";
            this.condition = condition.b;
        }
        else if (condition.t) {
            this.conditionType = "t";
            this.condition = condition.t;
            
            Utils.assert(condition.t > 0, "Invalid condition. Value must be >0");
            
            //Will be false in this.condition seconds
            setTimeout(() => this.invalidate(), this.condition * 1000);
        }
        else if (condition.i) {
            this.conditionType = "i";
            this.condition = condition.i;
        }
        else if (condition.c) {
            throw new Error("Condition type c not yet supported");
        }
	}
}