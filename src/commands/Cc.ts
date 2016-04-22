import {Command} from "./Command";
import {Color} from "../Color";

export class Cc extends Command {
    private color: Color;
    
    
    
    /**
     * Param: Color
     */
    constructor(color: Color) {
        super();
        this.color = color;    
    }
    
    
    
    /**
     * Method for executing the command
     */
    execute(): boolean {
        //
        
        return true;
    }
    
    
    
    /**
     * Method for stopping the execution
     */
    stop(): boolean {
        return true;
    }
}