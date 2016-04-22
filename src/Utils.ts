export module Utils {
    export function assert(condition: any, message: string) {
            if (!condition) {
                message = message || "Assertion failed";
                if (typeof Error !== "undefined") {
                    throw new Error(message);
                }
                throw message; // Fallback
            }
        };
        
    /**
	 * Compatibility method. Converts color of old format to new format.
	 */
	export function compatFormat(oldFormat: string) {
		let format: string, value: string, result: any = {};
	
		Utils.assert(oldFormat.charAt(0) === "{" && oldFormat.charAt(oldFormat.length - 1) === "}", "Color in compatibility mode must be defined between curly braces: " + oldFormat);

		format = oldFormat.split(":")[0].slice(1);
		value = oldFormat.split(":")[1].slice(0, -1);

		result[format] = value;

		return result;		
	}
}