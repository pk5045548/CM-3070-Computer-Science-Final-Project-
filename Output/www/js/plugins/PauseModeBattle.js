/*:
 * @plugindesc Adds a pause mode during battles. Press the "P" key to pause and unpause, including muffling the music and tinting the screen.
 * @author Your Name
 *
 * @help
 * This plugin allows players to pause the battle by pressing the "P" key.
 * It will freeze the battle, and also muffle the background music, when paused.
 * 
 * Usage:
 * 1. Press the "P" key to toggle pause mode during battle.
 * 2. In pause mode, time freezes in the battle (no actions are taken), music is muffled, and the screen is tinted.
 * 3. Press "P" again to resume.
 */

(function() {
    var isPaused = false;  // Flag to track whether the battle is paused
    var originalBgm = null;  // To store the original background music
    var originalBgmVolume = 100;  // To store the original volume of the BGM
    var tintSprite = null; // We'll use a Sprite to handle tint
    var pausedTextWindow = null; // To store the window displaying "PAUSED"
    var playtime = null;
    var playtext = null;
    // Function to toggle the pause mode
    var togglePause = function() {
        if (Input.isTriggered('pause')) {  // Use the default 'pause' key
            isPaused = !isPaused;

            if (isPaused) {
                // When paused, save the current BGM and reduce its volume to create the muffled effect
                originalBgm = AudioManager.saveBgm();  // Save the current BGM
                originalBgmVolume = AudioManager._bgmVolume;  // Save the current BGM volume
                if (originalBgmVolume > 30) {
                    AudioManager._bgmVolume = 30;  // Reduce the volume to a very low value (muffled effect)
                }
                AudioManager.playBgm({
                    name: originalBgm.name,
                    pan: originalBgm.pan,
                    pitch: originalBgm.pitch,
                    volume: AudioManager._bgmVolume
                });

                // Apply a tint (darkening effect) to the screen using a Sprite
                if (!tintSprite) {
                    tintSprite = new Sprite();
                    tintSprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
                    SceneManager._scene.addChild(tintSprite);
                }
                tintSprite.bitmap.fillAll('rgba(0, 0, 0, 0.5)'); // Semi-transparent black tint

                playtime = Graphics.frameCount;
                playtext =  $gameSystem.playtimeText();
                //                playtext = playtext.slice(0, -3);

                // Create and show the "PAUSED" message using a Window

                $gameTemp.reserveCommonEvent(59);

                if (!pausedTextWindow) {
                    pausedTextWindow = new Window_Base(0, 0, Graphics.width, Graphics.height); // Full screen window
                    pausedTextWindow.opacity = 0; // Make window transparent
                    pausedTextWindow.contents.fontSize = 48;  // Set font size
                    pausedTextWindow.contents.textColor = '#FFFFFF';  // Set text color (white)

                    // Center the "PAUSED" message
                    var text = 'Paused';
                    var x = Graphics.width / 2 - pausedTextWindow.contents.measureTextWidth(text) / 2;
                    var y = Graphics.height / 2 - pausedTextWindow.contents.fontSize / 2;

                    // Determine the "unpause" message based on the value of Game Variable 87
                    var unpauseText = $gameVariables.value(88) > 0 ? 'Press Start to Unpause' : 'Press P to Unpause';

                    // Calculate the vertical spacing between the lines
                    var lineSpacing = 12;

                    // Draw the "Paused" text centered
                    pausedTextWindow.drawText(text, x, y - (pausedTextWindow.contents.fontSize / 2), Graphics.width, 48, 'center');

                    // Draw the "Press Start / Press P" message below the "Paused" message
                    pausedTextWindow.contents.fontSize = 32;  // Reduce the font size for the unpause message

                    // Calculate the new x position for unpauseText to ensure it is centered
                    var unpauseTextX = Graphics.width / 2 - pausedTextWindow.contents.measureTextWidth(unpauseText) / 2;

                    // Draw the unpause message below "Paused"
                    pausedTextWindow.drawText(unpauseText, unpauseTextX, y + pausedTextWindow.contents.fontSize / 2 + lineSpacing, Graphics.width, 48, 'center');

                    // Reset font size to draw the play text
                    pausedTextWindow.contents.fontSize = 48;  // Set font size back to normal for the next line
                    pausedTextWindow.drawText(playtext, 0, y * 2 - 24, Graphics.width, 48, 'left');

                    // Add the window to the scene
                    SceneManager._scene.addChild(pausedTextWindow);

                }


            } else {
                // When unpaused, restore the original BGM and its volume
                if (originalBgm) {
                    AudioManager.playBgm(originalBgm);  // Restore the original BGM
                }
                AudioManager._bgmVolume = originalBgmVolume;  // Restore the original volume

                // Remove the tint by removing the tint sprite
                if (tintSprite) {
                    SceneManager._scene.removeChild(tintSprite);
                    tintSprite = null;
                }

                // Remove the "PAUSED" message window
                if (pausedTextWindow) {
                    SceneManager._scene.removeChild(pausedTextWindow);
                    pausedTextWindow = null;
                }
                if (playtime){
                    Graphics.frameCount = playtime;
                }
            }
        }
    };

    // Override the Scene_Battle update function to check for pause input
    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        togglePause();  // Toggle pause when the "P" key is pressed

        // If paused, prevent the rest of the update logic (but still call render to update visuals)
        if (isPaused) {
            return;  // Skip regular update processing, but still call render to keep visuals updated
        }

        // Continue the normal update process if not paused
        _Scene_Battle_update.call(this);
    };

    // Prevent the BattleManager from performing its regular update while paused
    var _BattleManager_update = BattleManager.update;
    BattleManager.update = function() {
        if (isPaused) {
            return;  // Skip updates when paused
        }

        // Continue with the regular battle update if not paused
        _BattleManager_update.call(this);
    };

    // Prevent any other actions in the battle when paused
    var _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        if (isPaused) {
            return;  // Skip processing the turn when paused
        }

        _BattleManager_processTurn.call(this);
    };

})();
