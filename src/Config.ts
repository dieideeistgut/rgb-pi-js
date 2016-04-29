declare function require(name:string): any;		//Tell the TypeScript compiler that the method require() will exist at runtime
var fs = require('fs-extra');

export class Config {
	
	//Default config
	private DEFAULT_CONFIG = {
		PORT: 4321,
		TIMEOUT: 5
	}
	
	
	//Callback method (most probably from the server-object)
	private configChangedCallback: Function;
	private config: any;

	
	
	/**
	 * Param: configChangedCallback is called when the config file changed
	 */
	constructor(configChangedCallback: Function = function() { return; }) {
		this.configChangedCallback = configChangedCallback;
		
		//Check whether serverconfig.json exists. If not, write default config
		try {
			fs.accessSync('./serverconfig.json', fs.F_OK);
		}
		catch(e) {
			this.writeDefaultConfig();
		}
				
		
		//Start watching the serverconfig.json
		fs.watch("./serverconfig.json", (function(event: any, name: any) {
				console.log("serverconfig.json changed. Reloading...");
				this.readConfigFromFile(true);
		}).bind(this));
		
		//Load config
		this.readConfigFromFile(false);
	}
	
	
	
	/**
	 * Reads the config from serverconfig.json. If update is set to true will call configChangedCallback
	 */
	readConfigFromFile(update: boolean = false): void {
		let packageObj = fs.readJsonSync('./serverconfig.json');
		
		this.config = packageObj;
		
		if (update) {
			this.configChangedCallback();
		}
	}

	
	
	/**
	 * Writes default config to serverconfig.json
	 */
	writeDefaultConfig(): void {
		console.warn("No serverconfig.json found. Writing default config.");
		
		//Make sure that the file exists
		fs.ensureFileSync('./serverconfig.json');
		
		//Default-config
		this.config = this.DEFAULT_CONFIG;
		fs.writeJsonSync('./serverconfig.json', this.config);
	}
	
	
	/**
	 * Getter
	 */
	getPort(): number {
		return this.config.PORT;
	}
	getTimeout(): number {
		return this.config.TIMEOUT;
	}
}