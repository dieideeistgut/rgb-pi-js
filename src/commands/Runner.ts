import {Command} from "./Command";

export class Runner {
    private commandList: Command[];
    private currentCommand: Command;
    private hasBeenStopped: boolean = false;
    
    
    
    /**
     * Param: list of unparsed commands
     */
    constructor(commandList: any[]) {
        this.commandList = this.parse(commandList);
    }
    
    
    
    /**
     * Parses commands
     */
    parse(command: any[]):Command[] {
        let result: Command[];
        
        //TODO: parse
        
        return result;        
    }
    
    
    
    /**
     * Method for interrupting the execution
     */
    stop(): boolean {
        this.hasBeenStopped = true;
        return this.currentCommand.stop();
    }



    /**
     * Method for actually executing the commands 
     */    
    run(): boolean {
        let i: number = 0;
        while (!this.hasBeenStopped && i < this.commandList.length) {
            this.currentCommand = this.commandList[i];

            this.currentCommand.execute();

            i++;
        }
        return true;
    }
}