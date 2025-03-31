//==============================================================================
// EliMZ_PauseGame.js
//==============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds a button to pause your game on Scene Map. Also pauses the Play time.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

• Pause the game by pressing a button when you are at the scene map
(This also stops the $gameSystem.playTime()).
• Choose an image to show when the game is paused.
• It saves the current playTime(Graphics.frameCount/$gameSystem.playTime()) 
before you pause, and restore it after you leave the pause scene.
• Adds a screen button to be able to pause the game too.
• Play a common event when leaving the pause scene and return to the map.

==============================================================================
How to use
==============================================================================

To pause the game you can press the keyboard button you choose or the 
button on the screen.
To unpause the game, you can either press the keyboard button again or 
click/touch the screen.

The image of the on-screen button has to be a specific format that follows 
this aspect ratio:
Width: 1 | Height: 2
Ex:
Width: 100 | Height: 200

You can use the plugin command to pause the game manually too.

For MV you can use Eli.PauseGame.pauseGame()

Here is a list of the default keys of RPG Maker(Keyboard/Gamepad):

"tab",      ■ Keyboard: tab
"ok",       ■ Keyboard: enter, space, Z ■ Gamepad: A
"shift",    ■ Keyboard: shift ■ Gamepad: X
"control",  ■ Keyboard: control, alt
"escape",   ■ Keyboard: escape, numpad0, insert, x
"pageup",   ■ Keyboard: Q, pageup ■ Gamepad: LB
"pagedown", ■ Keyboard: W, pagedown ■ Gamepad: RB
"left",     ■ Keyboard: left arrow, numpad4 ■ Gamepad: D-pad left
"up",       ■ Keyboard: up arrow, numpad8 ■ Gamepad: D-pad up
"right",    ■ Keyboard: right arrow, numpad6 ■ Gamepad: D-pad right
"down",     ■ Keyboard: down arrow, numpad2 ■ Gamepad: D-pad down
"debug"     ■ Keyboard: F9
"cancel"    ■ Gamepad: B
"menu"      ■ Gamepad: Y

============================================================================
Update Log
============================================================================

https://tinyurl.com/pauseGameLog

============================================================================

@param commonEvent
@text Common event
@type common_event
@desc Select a common event to play when leave the pause scene.
@default 0

@param switch
@text Disable Switch
@type switch
@desc If this switch is on, the pause access will be disabled.(Also hides the pause screen button)
@default 0

@param separator1
@text Keyboard / Gamepad

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true
@parent separator1

@param keyboardButton
@text Keyboard Button
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Choose the keyboard button.
@default none
@parent separator1

@param gamepadButton
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default none
@parent separator1

@param separator5
@text Screen Button

@param enableScreenButton
@text Enable Screen Button
@type boolean
@desc Set true to use a on screen button.
@default true
@parent separator5

@param buttonImage
@text Screen button Image
@type file
@dir img/system/
@desc Choose the image for the on screen button.
@default
@require 1
@parent separator5

@param position
@text Position
@type struct<positionSt>
@desc The position of the press start.
@default {"alignX":"center","offsetX":"0","alignY":"center","offsetY":"0"}
@parent separator5

@param separator2
@text Sound

@param pauseSe
@text Pause Se
@type file
@dir audio/se/
@desc Set here the sound to play when pause/resume the game.
@default
@parent separator2

@param pauseSeConfig
@text Pause Pan, Pitch, Volume
@type text
@desc Pan(-100, 100), Pitch(-50, 150), Volume(0, 100)
@default 0, 100, 60
@parent separator2

@param separator3
@text Background

@param blur
@text Blur background
@type boolean
@desc Choose if you want to blur the background.
@default false
@parent separator3

@param separator4
@text Pause Image

@param pauseImage
@text File
@type file
@dir img/system/
@desc Choose the file you want for the pause image.
@default
@require 1
@parent separator4

*/

/* -------------------------------- POSITION -------------------------------- */
{

/*~struct~positionSt:

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default left
        
@param offsetX
@text Position X
@type text
@desc The Offset X position.
@default 10
@parent alignX

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top

@param offsetY
@text Position Y
@type text
@desc The offset Y position.
@default 10
@parent alignY

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_PauseGame = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

/* ------------------------------ SPRITE BUTTON ----------------------------- */
class Sprite_PauseButton extends Sprite_Base {

    constructor(){
        super()
    }

    initialize(){
        super.initialize()
        this.createBitmap()
        this.maxWaitCount = 15
        this.waitCount = 0
    }

    initPosition(){  
        if(isNaN(Plugin.cache.position.x)){
            const {alignX, offsetX, alignY, offsetY} = Plugin.param().position
            const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, this.bitmap.width, "x")
            const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, this.bitmap.height/2, "y")
            Plugin.cache.position = {
                x: x,
                y: y
            }
            this.move(x, y)
        }else{
            this.move(Plugin.cache.position.x, Plugin.cache.position.y)
        }
    }

    createBitmap(){
        this.bitmap = ImageManager.loadSystem(Plugin.param().buttonImage)
        this.bitmap.addLoadListener(() => {
            this.setFrame(0, 0, this.bitmap.width, this.bitmap.height/2)
            this.initPosition()
            this.refreshMainRect(false)
        })
    }

    updateFrameOnClick(){
        this.setFrame(0, this.bitmap.height/2, this.bitmap.width, this.bitmap.height/2)
    }

    isVisible(){
        return !$gameSwitches.disablePause() && !$gameMessage.isBusy() && !$gameMap.isEventRunning()
    }

    updateWaitCount(){
        this.waitCount++
        if(this.waitCount >= this.maxWaitCount){
            this.waitCount = 0
            this.visible = true
        }
    }

    update(){
        if(this.isVisible() && !this.visible){
            this.updateWaitCount()
        }else{
            this.waitCount = 0
            this.visible = this.isVisible()
        }
    }

}

/* ------------------------------- SCENE PAUSE ------------------------------ */
class Scene_Pause extends Scene_Base{

    constructor(){
        super()
    }

    initialize(){
        super.initialize()
        this.createMapSnapBackground()
        this.createBackground()
        this.createPauseSprite()
    }

    createMapSnapBackground(){
        this.background = new Sprite()
        this.addChild(this.background)
    }

    createBackground(){
        this.background = new Sprite()
        this.background.bitmap = new Bitmap(Graphics.width, Graphics.height)
        this.background.bitmap.fillAll('black')
        this.background.opacity = 150
        this.background._refresh()
        this.addChild(this.background)
    }

    createPauseSprite(){
        this.pauseSprite = new Sprite_PauseImage()
        this.addChild(this.pauseSprite)
    }

    start(){
        super.start()
        this.background.bitmap = SceneManager.backgroundBitmap()
    }

    update(){
        if(Input.isPauseKeyTriggered() || TouchInput.isTriggered()){
            this.updateEnd()
        }
    }

    updateEnd(){
        Graphics.frameCount = Plugin.tempFrameCount
        Plugin.setState(false)
        SceneManager.pop()
    }

    terminate(){
        super.terminate()
        SoundManager.playPause()
        $gameTemp.reserveCommonEvent(Plugin.param().commonEvent)
    }
}

/* ------------------------------ PAUSE SPRITE ------------------------------ */
class Sprite_PauseImage extends Sprite{

    constructor(bitmap){
        super(bitmap)
    }

    initialize(){
        super.initialize()
        this.visible = true
        this.createBitmap()
    }

    createBitmap(){
        this.bitmap = ImageManager.loadSystem(Plugin.param().pauseImage)
        this.bitmap.addLoadListener(this.setPosition.bind(this))
    }

    setPosition(){
        const x = Eli.Utils.calculateScreenPosition("center", 0, this.bitmap.width, "x")
        const y = Eli.Utils.calculateScreenPosition("center", 0, this.bitmap.height, "y")
        this.move(x, y)
    }

    update(){}
}    

/* ------------------------------ PLUGIN OBJECT ----------------------------- */
Eli.PauseGame = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-pause-game-for-rpg-maker-mv",
    parameters: {
        keyboardButton: 0,
        gamepadButton: 0,
        overwrite: false,
        blur: false, 
        pauseSe: '',
        pausePitch: '',
        pausePan: '',
        pauseVolume: '',
        commonEvent: 0,
        pauseImage: '',
        enableScreenButton: false,
        switch: 0,
        buttonImage: '',
        position: {
            alignX: "",
            alignY: "",
            offsetX: 0,
            offsetY: 0,
        }
    },
    alias: {},
    tempFrameCount: 0,
    background: null,
    pause: false,
    button: 'pause',
    cache: {
        position: {x: "null", y: "null"},
    },
    Sprite_PauseButton: Sprite_PauseButton,
    Scene_Pause: Scene_Pause,
    Sprite_PauseImage: Sprite_PauseImage,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initButtons()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        const [pan, pitch, volume] = parameters.pauseSeConfig.split(",").map(item => Number(item))
        this.parameters = parameters
        this.parameters.pausePitch = pitch
        this.parameters.pausePan = pan
        this.parameters.pauseVolume = volume
    },

    initPluginCommands(){
        const commands = ['pauseGame', 'changeImage']
        Eli.PluginManager.registerCommands(this, commands)
    },

    initButtons(){
        if(this.parameters.keyboardButton !== "none"){
            this.setKeyboardButton()
        }

        if(this.parameters.gamepadButton !== "none"){
            this.setGamePadButton()
        }
    },

    setKeyboardButton(){
        const keyName = this.parameters.keyboardButton.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        if(this.parameters.overwrite){
            Input.keyMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = this.button

        }else{
            this.button = Input.keyMapper[keyCode]
        }
    },

    setGamePadButton(){
        const keyName = this.parameters.gamepadButton.toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        if(this.parameters.overwrite){
            Input.gamepadMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultGamepad(keyCode)){
            Input.gamepadMapper[keyCode] = this.button

        }else{
            this.button = Input.gamepadMapper[keyCode]
        }
    },

    getButton(){
        return this.button
    },

    param(){
        return this.parameters
    },

    storeFrameCount(value){
        this.tempFrameCount = value
    },

    setState(value){
        this.pause = value
    },

    isPaused(){
        return this.pause
    },

    setBackground(value){
        this.background = value
    },

/* ----------------------------- PLUGIN COMMAND ----------------------------- */

    pauseGame(){
        this.setState(true)
    },

    changeImage(args){
        this.parameters.pauseImage = args[0]
    },

    executePluginCommandMV(command, args){
        const cmdList = {
            PAUSEIMAGE: "changeImage",
            PAUSEGAME: "pauseGame",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]) {
            this[cmd](args)
        }
    }
}

const Plugin = Eli.PauseGame
const Alias = Eli.PauseGame.alias

Plugin.initialize()

/* ---------------------------------- INPUT --------------------------------- */
Input.isPauseKeyTriggered = function(){
    console.log("aaa");
    return this.isTriggered(Plugin.getButton())
}

/* ------------------------------ SOUND MANAGER ----------------------------- */
{

SoundManager.playPause = function(){
    const se = {
        name: Plugin.param().pauseSe,
        pan: Plugin.param().pausePan || 0,
        pitch: Plugin.param().pausePitch || 100,
        volume: Plugin.param().pauseVolume || ConfigManager.seVolume
    }
    AudioManager.playSe(se)
}

}

/* ------------------------------ GAME SWITCHES ----------------------------- */
{

Game_Switches.prototype.disablePause = function(){
    const id = Plugin.param().switch
    return this.value(id)
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.SceneMap_createButtons = Scene_Map.prototype.createButtons;
Scene_Map.prototype.createButtons = function() {
    Alias.SceneMap_createButtons.call(this)
    this.createPauseGameButton()
}

Alias.SceneMap_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
    Alias.SceneMap_update.call(this)
    this.updatePauseGameScreenButton()
    this.updatePauseGameKeyButton()
}

Alias.SceneMap_isMapTouchOk = Scene_Map.prototype.isMapTouchOk
Scene_Map.prototype.isMapTouchOk = function() {
    const alias = Alias.SceneMap_isMapTouchOk.call(this)
    return alias && !this.isPauseButtonPressed()
}

Alias.SceneMap_terminate = Scene_Map.prototype.terminate
Scene_Map.prototype.terminate = function(){
    this.hidePauseButton()
    this.setupPauseScene()
    Alias.SceneMap_terminate.call(this)
}

Scene_Map.prototype.createPauseGameButton = function() {
    if(!Plugin.param().enableScreenButton) return
    this.pauseGameButton = new Sprite_PauseButton()
    this.addChild(this.pauseGameButton)
}

Scene_Map.prototype.isPauseButtonPressed = function(){
    return  this.pauseGameButton && this.pauseGameButton.isMainRectClicked() && 
            !$gameMap.isEventRunning()
}

Scene_Map.prototype.updatePauseGameScreenButton = function(){
    if(this.isPauseButtonPressed()){
        this.pauseGameButton.updateFrameOnClick()
        this.callScenePause()
    }
}

Scene_Map.prototype.canUpdatePauseGameKeyButton = function(){
    return !$gameMap.isEventRunning() && 
            (Input.isPauseKeyTriggered() || Plugin.isPaused())
}

Scene_Map.prototype.updatePauseGameKeyButton = function(){
    if(this.canUpdatePauseGameKeyButton()){
        this.callScenePause()
    }
}

Scene_Map.prototype.callScenePause = function(){
    if($gameSwitches.disablePause()) return
    Plugin.storeFrameCount(Graphics.frameCount)

    if(!Plugin.param().blur) {
        Plugin.setBackground(SceneManager.snap())
    }

    SoundManager.playPause()
    SceneManager.push(Scene_Pause)
}

Scene_Map.prototype.hidePauseButton = function(){
    if(this.pauseGameButton){
        this.pauseGameButton.hide()
        this.pauseGameButton.visible = false
    }
}

Scene_Map.prototype.setupPauseScene = function(){
    if(SceneManager.isNextScene(Scene_Pause) && !Plugin.param().blur){
        SceneManager._backgroundBitmap = Plugin.background
    }
}

}

}