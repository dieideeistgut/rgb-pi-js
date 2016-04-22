import {Command} from "./Command";
import {Color} from "../Color";
import {Condition} from "../Condition";
import {Runner} from "./Runner";

export class Loop extends Command {
    private commands: Command[];
    private condition: Condition;
    private hasBeenStopped: boolean = false;
    private runner: Runner;
    
    
    
    /**
     * Params: commandList, Condition
     */
    constructor(commands: Command[], condition: any) {
        super();
        this.commands = commands;   
        this.condition = new Condition(condition, this.stop); 
    }
    
    
    
    /**
     * Method for executing the command
     */
    execute(): boolean {
        this.runner = new Runner(this.commands);
        while (!this.hasBeenStopped && this.condition.isTrue()) {
            this.runner.run();
            this.condition.iterate();
        }
        
        return true;
    }
    
    
    
    /**
     * Method for stopping the execution
     */
    stop(): boolean {
        this.runner.stop();
        this.hasBeenStopped = true;
        return true;
    }
}