/*:
 * @plugindesc Detects connected gamepad and stores its ID and type in variables. 
 *
 * @help
 * This plugin allows you to detect a connected gamepad and store its ID and type
 * in game variables. It automatically assigns a gamepad ID and type based on
 * the connected device (Xbox, Sony, Nintendo, or generic).
 *
 * Usage:
 * In your events, use the script call:
 *   GamepadDetector.detectGamepad();
 * 
 * This will update:
 * - Variable 1 with the gamepad ID (as a string)
 * - Variable 2 with the gamepad type (1 for Xbox, 2 for Sony, 3 for Nintendo, 4 for generic)
 */

var GamepadDetector = GamepadDetector || {};

// Detect gamepad and set game variables
GamepadDetector.detectGamepad = function() {
    var gamepad = navigator.getGamepads()[0];

    if (gamepad) {
        var gamepadID = gamepad.id;
//        $gameVariables.setValue(87, gamepadID);

        if (gamepadID.includes('Xbox')) {
            // Xbox Controller set to 1
            $gameVariables.setValue(88, 1);
        } else if (gamepadID.includes('054c')) {
            // Sony Controller set to 2
            $gameVariables.setValue(88, 2);
        } else if (gamepadID.includes('057e')) {
            // Nintendo Controller set to 3
            $gameVariables.setValue(88, 3);
        } else {
            // Generic Controller set to 4
            $gameVariables.setValue(88, 4);
        }
    } else {
        // No gamepad detected
        $gameVariables.setValue(88, 0);
    }
console.log("Variable 87: " + $gameVariables.value(87));
console.log("Variable 88: " + $gameVariables.value(88));
};

// Expose the function for use in RPG Maker MV events
window.GamepadDetector = GamepadDetector;
