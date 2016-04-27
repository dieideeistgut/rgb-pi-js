import {DataTypes} from "./DataTypes";
import {Utils} from "./Utils";


export class Color extends DataTypes.DataType {
	private c: number[];


	
	/**
	* Color-Object
	* Examples:
	* {x:"FFFF88"}
	* {b:"255,255,136"}
	* {f:"1, 1, 0.53"}
	* {r:"0.3-0.6, 0-0, 0.6-1"}
	* {hsv:"60, 100, 100"}
	* {hsl:"73, 100, 50}
	*/
	constructor(color: any) {
		super();
		
		this.c = this.convert(color);
		console.log("Instantiiated color with param "+color+". this.c contains: "+this.c+". toString() delivers: "+this.c.toString());
	}
	
	
	
	/**
	 * Returns a string
	 */
	toString() {
		let result: string;
		result = "R: " + this.c[0] + ". G: "+this.c[1]+". B: "+this.c[2];
		return result;
	}
	
	
	
	/**
	 * Converts color of any supported format (x = Hex-String, b = Byte-Array, f = Float-Array, r = random, hsv = HSV, hsl = HSL) to float array
	 */
	convert(color: any) {
		//Compatibility
		if (typeof color === "string") {
			color = Utils.compatFormat(color);
		}
		
		//Make sure that one of the supported formats is given
		Utils.assert(color.x || color.b || color.f || color.r || color.hsv || color.hsl, "Wronsg format or no format given for color: " + color);
		
		//Needs to be splitted
		let values: number[];
		let fn: any;
		
		//Byte Array
		if (color.b) {
			values = color.b.split(",");
			fn = this.byteArrayToFloatArray;
		}
		
		//Float Array
		else if (color.f) {
			values = color.f.split(",");
			fn = this.floatArrayToFloatArray;
		}
		//Random
		else if (color.r) {
			values = color.r.split(",");
			fn = this.randomToFloatArray;
		}
		//HSV
		else if (color.hsv) {
			values = color.hsv.split(",");
			fn = this.hsvToFloatArray.bind(this);
		}
		//HSL
		else if (color.hsl) {
			values = color.hsl.split(",");
			fn = this.hslToFloatArray;
		}
		
		//Make sure that there are 3 elements in values
		Utils.assert(values.length === 3, "Wrong format for color: "+color);
		
		//Convert and store
		return fn(values);
	}
		

	
	/**
	 * Converts hexString (FFDDFF) to floatArray. Accepts shorthand form (e.g. "03F", which translates to "0033FF")
	 * @param hexString	Input hex-string. Either 3 or 6 characters of length.
	 */
	hexStringToFloatArray(hexString: string) {
		//assert(hexString.length === 3 || hexString.length === 6, "Hex string must be 3 or 6 characters long");
		
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		let shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hexString = hexString.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
		
		return this.byteArrayToFloatArray([parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]);
	}
	
	
	
	/**
	 * Converts byteArray (RGB) to floatArray
	 */
	byteArrayToFloatArray(byteArray: number[]) {
		let floatArray: number[] = [];
		byteArray.forEach(
			function convert(value, index) {
				floatArray[index] = value / 255;
			}
		);
		return floatArray;
	}
	
	
	
	/**
	 * Converts.. yeah, nothing. Maybe some checks?
	 */
	floatArrayToFloatArray(floatArray: number[]) {
		//some checks?
		return floatArray;
	}
	
	
	
	/**
	 * Converts "random" to floatArray. Actually calculates random numbers in a given range.
	 */
	randomToFloatArray(rangesArray: string[]) {
		let byteArray: number[] = [];
		rangesArray.forEach(
			function calcRand(value: string, index: number) {
				let maxByte: number = parseFloat(value.split("-")[1]) * 255;
				let minByte: number = parseFloat(value.split("-")[0]) * 255;
				
				byteArray[index] = Math.floor(Math.random()*(maxByte-minByte+1)+minByte)
			}
		);
		return this.byteArrayToFloatArray(byteArray);
	}
	
	
	
	/**
	 * Converts a color in HSV-model to floatArray.
	 */
	hsvToFloatArray(hsvArray: number[]) {
		let r: number,
			g: number,
			b: number,
			i: number,
			f: number,
			p: number,
			q: number,
			t: number,
			h: number = hsvArray[0],
			s: number = hsvArray[1],
			v: number = hsvArray[2];
		
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return this.byteArrayToFloatArray([Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]);
	}
	
	
	
	/**
	 * Returns a byte array
	 */
	getByteArray(): number[] {
		let result: number[] = [];
		
		result[0] = this.c[0] * 255;
		result[1] = this.c[1] * 255;
		result[2] = this.c[2] * 255;				
		return result;
	}
	
	
	
	/**
	 * Converts a color in HSL-model to floatArray
	 */
	hslToFloatArray(hslArray: number[]) {
		return;
	}
}