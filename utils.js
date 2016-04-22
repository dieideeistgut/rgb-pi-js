"use strict";
var Utils;
(function (Utils) {
    function assert(condition, message) {
        if (!condition) {
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
    Utils.assert = assert;
    ;
})(Utils = exports.Utils || (exports.Utils = {}));
