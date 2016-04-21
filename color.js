var assert = require('./utils').assert;


/**
* Converts color of any supported format (x = Hex-String, b = Byte-Array, f = Float-Array, r = random, hsv = HSV, hsl = HSL) to float array
* Examples:
* {x:"FFFF88"}
* {b:"255,255,136"}
* {f:"1, 1, 0.53"}
* {r:"0.3-0.6, 0-0, 0.6-1"}
* {hsv:"60, 100, 100"}
* {hsl:"73, 100, 50}
*/
exports.Color = function(color) {
	assert(color, "Missing parameter: color");
	assert(color.x || color.b || color.f || color.r || color.hsv || color.hsl, "Wrong format or no format given for color: " + color)
	
	//Hex string
	if (color.x) {
		return hexStringToFloatArray(color.x);
	}
	
	//Needs to be splitted
	else {
		var values;
		var fn;
		//Byte Array
		if (color.b) {
			values = color.b.split(",");
			fn = byteArrayToFloatArray;
		}
		//Float Array
		else if (color.f) {
			values = color.f.split(",");
			fn = floatArrayToFloatArray;
		}
		//Random
		else if (color.r) {
			values = color.r.split(",");
			fn = randomToFloatArray;
		}
		//HSV
		else if (color.hsv) {
			values = color.hsv.split(",");
			fn = hsvToFloatArray;
		}
		//HSL
		else if (color.hsl) {
			values = color.hsl.split(",");
			fn = hslToFloatArray;
		}
		assert(values.length === 3, "Wrong format for color: "+color);
		return fn(values);
	}
}
function hexStringToFloatArray(hexString) {
	assert(hexString.length === 3 || hexString.length === 6, "Hex string must be 3 or 6 characters long");
	
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hexString = hexString.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
	
	return byteArrayToFloatArray([parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]);
}
function byteArrayToFloatArray(byteArray) {
	var floatArray = [];
	byteArray.forEach(
		function convert(value, index) {
			floatArray[index] = value / 255;
		}
	);
	return floatArray;
}
function floatArrayToFloatArray(floatArray) {
	//some checks?
	return floatArray;
}
function randomToFloatArray(rangesArray) {
	var byteArray = [];
	rangesArray.forEach(
		function calcRand(value, index) {
			var maxByte = parseFloat(value.split("-")[1]) * 255;
			var minByte = parseFloat(value.split("-")[0]) * 255;
			
			byteArray[index] = Math.floor(Math.random()*(maxByte-minByte+1)+minByte)
		}
	);
	return byteArrayToFloatArray(byteArray);
}
function hsvToFloatArray(hsvArray) {
	
}
function hslToFloatArray(hslArray) {
	
}