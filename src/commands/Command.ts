export abstract class Command {
    
    constructor() {
        
    }
    
    abstract execute(): boolean;
    abstract stop(): boolean;
}