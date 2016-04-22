"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DataTypes_1 = require("./DataTypes");
var Utils_1 = require("./Utils");
var Color = (function (_super) {
    __extends(Color, _super);
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
    function Color(color) {
        _super.call(this);
        this.c = this.convert(color);
        console.log("Instantiiated color with param " + color + ". this.c contains: " + this.c + ". toString() delivers: " + this.c.toString());
    }
    /**
     * Returns a string
     */
    Color.prototype.toString = function () {
        var result;
        result = "R: " + this.c[0] + ". G: " + this.c[1] + ". B: " + this.c[2];
        return result;
    };
    /**
     * Converts color of any supported format (x = Hex-String, b = Byte-Array, f = Float-Array, r = random, hsv = HSV, hsl = HSL) to float array
     */
    Color.prototype.convert = function (color) {
        //Compatibility
        if (typeof color === "string") {
            color = this.compatColor(color);
        }
        //Make sure that one of the supported formats is given
        Utils_1.Utils.assert(color.x || color.b || color.f || color.r || color.hsv || color.hsl, "Wrong format or no format given for color: " + color);
        //Needs to be splitted
        var values;
        var fn;
        //Byte Array
        if (color.b) {
            values = color.b.split(",");
            fn = this.byteArrayToFloatArray;
        }
        else if (color.f) {
            values = color.f.split(",");
            fn = this.floatArrayToFloatArray;
        }
        else if (color.r) {
            values = color.r.split(",");
            fn = this.randomToFloatArray;
        }
        else if (color.hsv) {
            values = color.hsv.split(",");
            fn = this.hsvToFloatArray;
        }
        else if (color.hsl) {
            values = color.hsl.split(",");
            fn = this.hslToFloatArray;
        }
        //Make sure that there are 3 elements in values
        Utils_1.Utils.assert(values.length === 3, "Wrong format for color: " + color);
        //Convert and store
        return fn(values);
    };
    /**
     * Compatibility method. Converts color of old format to new format.
     */
    Color.prototype.compatColor = function (oldFormat) {
        var format, value, color = {};
        Utils_1.Utils.assert(oldFormat.charAt(0) === "{" && oldFormat.charAt(oldFormat.length - 1) === "}", "Color in compatibility mode must be defined between curly braces: " + oldFormat);
        format = oldFormat.split(":")[0].slice(1);
        value = oldFormat.split(":")[1].slice(0, -1);
        color[format] = value;
        return color;
    };
    /**
     * Converts hexString (FFDDFF) to floatArray. Accepts shorthand form (e.g. "03F", which translates to "0033FF")
     * @param hexString	Input hex-string. Either 3 or 6 characters of length.
     */
    Color.prototype.hexStringToFloatArray = function (hexString) {
        //assert(hexString.length === 3 || hexString.length === 6, "Hex string must be 3 or 6 characters long");
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hexString = hexString.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        return this.byteArrayToFloatArray([parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]);
    };
    /**
     * Converts byteArray (RGB) to floatArray
     */
    Color.prototype.byteArrayToFloatArray = function (byteArray) {
        var floatArray = [];
        byteArray.forEach(function convert(value, index) {
            floatArray[index] = value / 255;
        });
        return floatArray;
    };
    /**
     * Converts.. yeah, nothing. Maybe some checks?
     */
    Color.prototype.floatArrayToFloatArray = function (floatArray) {
        //some checks?
        return floatArray;
    };
    /**
     * Converts "random" to floatArray. Actually calculates random numbers in a given range.
     */
    Color.prototype.randomToFloatArray = function (rangesArray) {
        var byteArray = [];
        rangesArray.forEach(function calcRand(value, index) {
            var maxByte = parseFloat(value.split("-")[1]) * 255;
            var minByte = parseFloat(value.split("-")[0]) * 255;
            byteArray[index] = Math.floor(Math.random() * (maxByte - minByte + 1) + minByte);
        });
        return this.byteArrayToFloatArray(byteArray);
    };
    /**
     * Converts a color in HSV-model to floatArray.
     */
    Color.prototype.hsvToFloatArray = function (hsvArray) {
        var r, g, b, i, f, p, q, t, h = hsvArray[0], s = hsvArray[1], v = hsvArray[2];
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return this.byteArrayToFloatArray([Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]);
    };
    /**
     * Converts a color in HSL-model to floatArray
     */
    Color.prototype.hslToFloatArray = function (hslArray) {
        return;
    };
    return Color;
}(DataTypes_1.DataTypes.DataType));
exports.Color = Color;
