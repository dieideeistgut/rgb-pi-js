import {Command} from "./Command";
import {Color} from "../Color";

export class Wait extends Command {
    private time: number;
    
    constructor(time: number) {
        super();
        this.time = time;    
    }
    
    execute(): boolean {
        //
        
        return true;
    }
    
    stop(): boolean {
        return true;
    }
}