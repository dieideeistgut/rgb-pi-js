import {Command} from "./Command";
import {Color} from "../Color";

export class Fade extends Command {
    private startColor: Color;
    private endColor: Color;
    private time: number;
    private targetTime: number;
    
    
    
    /**
     * Params: endColor, time, [startColor]
     */
    constructor(endColor: Color, time: number, startColor: Color = null) {
        super();
        this.endColor = endColor; 
        this.startColor = startColor;
        this.time = time; 
    }
    
    
    
    /**
     * Method for executing the command
     */
    execute(): boolean {
        //while earlier than targetTime
        
        return true;
    }
    
    
    
    /**
     * Method for stopping the execution
     */
    stop(): boolean {
        this.targetTime = 0;
        return true;
    }
}