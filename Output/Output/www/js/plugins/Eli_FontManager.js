//============================================================================
// Eli_FontManager.js
//============================================================================

/*:

@plugindesc ♦5.0.1♦ Manage several font settings for your game!
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

● Use multiple fonts in-game and attach them into different scenes or 
windows!
● Set different fonts for Game Timer and Game Title!
● Store the font changes into a save file.
Set predefined settings for the fonts like text color, outline color, 
outline width, italic and bold!

==============================================================================
How to use
==============================================================================

The first font MUST be named "GameFont" and it will be used as a
default font. Meaning if a custom font does not have a color or size set,
it will take the one from the custom font.

Also, a window, scene, or sprite that does not have any font assigned to 
them, will also take the default font.

♦ Free Version ♦

● Plugin Parameters: Font List

Here you can add as many fonts as you want.
The "Face" parameter cannot have spaces. This is like an ID for the font.

You can choose to attach a font either to a Scene or to a specific window.
Keep in mind that the window fonts have priority over the scenes fonts.

● Plugin Parameters: Save Font Changes

If you set this to true, any change that you made with escape codes or 
plugin commands, will be permanent. This means that if you want to reset 
the font settings to default, you have to do this manually with plugin 
commands or escape codes.
Otherwise, when accessing the scene or window again, the font will be 
automatically reverted to default settings(Or changing pages, in the
case of the message window).

● Changing Font

You can change the fonts with plugin commands or using escape codes 
(Requires Eli Message Action)

● Sprite Fonts

You will also be able to choose what font the game will use for 
Game Timer and Game Title.

NOTE¹: I only tested with .ttf, .otf, and .woff and they worked.

==============================================================================
Plugin Commands
==============================================================================

Change Font Face for a valid Font Face name set on the plugin parameters.
Change WindowName and SceneName with a valid Window and Scene name.

SetWindowFont [FontFace] [WindowName] [WindowName] [WindowName]...
SetSceneFont [FontFace] [SceneName] [SceneName] [SceneName]...
ResetWindowFont [WindowName] [WindowName] [WindowName]...
ResetSceneFont [SceneName] [SceneName] [SceneName]...
ResetAllFont

• Examples:

SetWindowFont Message Window_Message
SetSceneFont Menu Scene_Menu

ResetWindowFont Window_Message
ResetSceneFont Scene_Message

============================================================================
Update Log
============================================================================

https://tinyurl.com/fontManager

============================================================================

@param fonts
@text Font List
@type struct<fontListSt>[]
@desc Setup here all your fonts.
@default

@param defaultIndex
@text Default Font Index
@type number
@desc The font index of the font list that will be used by default, in case a window or scene didn't have one.
@default 0

@param saveFontChanges
@text Save Font Changes
@type boolean
@desc Choose if you want to save font changes when using plugin command or escape codes.
@default true

*/

/* -------------------------------- FONT LIST ------------------------------- */
{
/*~struct~fontListSt:

@param face
@text FontFace
@type text
@desc The font face that will be used to reference this font inside game.
@default 

@param file
@text Font file
@type text
@desc The font file to load(with extension!).
@default 

@param size
@text Font Size
@type text
@desc The default font size for this font.
@default 26

@param textColor
@text Text Color
@type text
@desc Choose a color for the text. Supports HTML/HEX/RGB/RGBA.
Default is #ffffff
@default #ffffff

@param outlineColor
@text Outline Color
@type text
@desc Choose a color for the outline. Supports HTML/HEX/RGB/RGBA.
Default is 0, 0, 0, 0.5.
@default 0, 0, 0, 0.5

@param outlineWidth
@text Outline Width
@type number
@desc Default value is 3.
@default 3

@param italic
@text Italic
@type boolean
@desc Set to true to use italic font and false to not.
@default false

@param bold
@text Bold
@type boolean
@desc Set to true to use bold font and false to not.
@default false

@param sceneList
@text Scene List
@type combo[]
@option Scene_Battle @option Scene_Debug @option Scene_Equip @option Scene_GameEnd @option Scene_Gameover @option Scene_Item @option Scene_Load @option Scene_Map @option Scene_MapSelect @option Scene_Menu @option Scene_MenuInfo @option Scene_Name @option Scene_Option @option Scene_Save @option Scene_Shop @option Scene_Skill @option Scene_Status @option Scene_Title 
@desc A list of all scenes that will use this font.
It is case sensitive.
@default []

@param windowList
@text Window List
@type combo[]
@option Window_ActorCommand @option Window_BattleActor @option Window_BattleEnemy @option Window_BattleItem @option Window_BattleLog @option Window_BattleSkill @option Window_BattleStatus @option Window_ChoiceList @option Window_CommandInfo @option Window_DebugEdit @option Window_DebugRange @option Window_DescriptionInfo @option Window_EquipCommand @option Window_EquipItem @option Window_EquipSlot @option Window_EquipStatus @option Window_EventItem @option Window_GameEnd @option Window_Gold @option Window_Help @option Window_ItemCategory @option Window_ItemList @option Window_MapName @option Window_MapSelectCommand @option Window_MenuActor @option Window_MenuCommand @option Window_MenuStatus @option Window_Message @option Window_NameBox @option Window_NameEdit @option Window_NameInput @option Window_NumberInput @option Window_Options @option Window_PartyCommand @option Window_SavefileList @option Window_ScrollText @option Window_ShopBuy @option Window_ShopCommand @option Window_ShopNumber @option Window_ShopSell @option Window_ShopStatus @option Window_SkillList @option Window_SkillStatus @option Window_SkillType @option Window_Status @option Window_StatusEquip @option Window_StatusParam @option Window_TitleCommand @option Window_TitleInfo @option Window_ToastInfo
@desc A list of all windows that will use this font.
It is case sensitive.
@default []

@param isForGameTimer
@text Use on Game Timer
@type boolean
@desc If true, this font will be used on the game timer.
@default false

@param isForGameTitle
@text Use on Game Title
@type boolean
@desc If true, this font will be used to draw the game title on title screen.
@default false

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FontManager = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.FontManager = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-font-manager-for-rpg-maker",
    parameters: {
        saveFontChanges: false,
        defaultIndex: 0,
        fonts: [{
            file: '',
            face: '',
            size: 28,
            textColor: '',
            outlineColor: '',
            outlineWidth: 0,
            italic: false,
            bold: false,
            sceneList: [""],
            windowList: [""],
            isForGameTimer: false,
            isForGameTitle: false,
            isForDamageSprite: false, // MV Don't support this.
            isForGaugeLabel: false, // MV Don't support this.
            isForGaugeValue: false, // MV Don't support this.
            isForBattlerName: false, // MV Don't support this.
        }],
    },
    alias: {},
    pro: true, // MV is always PRO

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
        this.formatFonts()
    },

    initPluginCommands(){},

    formatFonts(){
        for(let i = 0; i < this.param().fonts.length; i++){
            const font = this.param().fonts[i]

            if(i > 0){
                const defaultFont = this.param().fonts[0]
                font.size = font.size || defaultFont.size
                font.outlineWidth = isNaN(font.outlineWidth) ? defaultFont.outlineWidth : font.outlineWidth
                font.outlineColor = Eli.ColorManager.getHexOrName(font.outlineColor) || defaultFont.outlineColor
                font.textColor = Eli.ColorManager.getHexOrName(font.textColor) || defaultFont.textColor
            }else{
                font.face = "GameFont"
                font.outlineColor = Eli.ColorManager.getHexOrName(font.outlineColor)
                font.textColor = Eli.ColorManager.getHexOrName(font.textColor)
            }
        }
    },

    param(){
        return this.parameters
    },

    findParameterFont(fontFace){
        if(isNaN(fontFace)){
            return this.param().fonts.findIndex(font => font.face.toLowerCase() === fontFace.toLowerCase())
        }else{
            return Number(fontFace)
        }
    },

    findSavedFont(containerName){
        return this.savedFonts()[containerName]
    },

    savedFonts(){
        return $eliData.contents.FontManager
    },

    changeContainerFont(containerName, fontFace){
        const fontIndex = this.findParameterFont(fontFace)

        if(fontIndex > -1){
            this.savedFonts()[containerName] = fontIndex
        }
    },

    removeSavedFont(containerName){
        delete this.savedFonts()[containerName]
    },

    cmd_changeFont(args){
        args = Eli.PluginManager.convertParameters(args)

        for(const winName of args.winName || []){
            this.changeContainerFont(winName, args.face)
        }

        for(const sceneName of args.sceneName || []){
            this.changeContainerFont(sceneName, args.face)
        }
    },

    cmd_resetFont(args){
        args = Eli.PluginManager.convertParameters(args)

        for(const winName of args.winName || []){
            this.removeSavedFont(winName)
        }

        for(const sceneName of args.sceneName || []){
            this.removeSavedFont(sceneName)
        }
    },

    cmd_resetAllFont(args){
        $eliData.initFontManagerData()
    },

    loadAllFonts(){
        const fontList = this.param().fonts
        for(const font of fontList){
            Graphics.loadFont(font.face, `fonts/${font.file}`)
        }
    },

    executeCommand(command, args){
        command = command.toUpperCase()
        switch(command){
            case "SETWINDOWFONT":
                this.cmd_changeFont({face: args[0], winName: args.slice(1), sceneName: []})
            break;
            case "SETSCENEFONT":
                this.cmd_changeFont({face: args[0], winName: [], sceneName: args.slice(1)})
            break;
            case "RESETWINDOWFONT":
                this.cmd_resetFont({winName: args, sceneName: []})
            break;
            case "RESETSCENEFONT":
                this.cmd_resetFont({winName: [], sceneName: args})
            break;
            case "RESETALLFONT":
                this.cmd_resetAllFont()
            break;
        }
    },
    
}

const Plugin = Eli.FontManager
const Alias = Eli.FontManager.alias

Plugin.initialize()

/* ------------------------------- SAVED DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.initFontManagerData()
}

Eli_SavedContents.prototype.initFontManagerData = function(){
    this.contents.FontManager = {}
}

}

/* ------------------------------- GAME TIMER ------------------------------- */
{

Game_Timer.prototype.customFont = function() {
    return Plugin.param().fonts.find(font => font.isForGameTimer) || Plugin.param().fonts[0]
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executeCommand(command, args)
}

}

/* ------------------------------ SCENE MANAGER ----------------------------- */
{

Alias.SceneManager_initialize = SceneManager.initialize
SceneManager.initialize = function(){
    Alias.SceneManager_initialize.call(this)
    Plugin.loadAllFonts()
    
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

// Overwrite
Scene_Title.prototype.drawGameTitle = function() {
    const [text, x, y, maxWidth] = this.createGameTitleSettings()
    this.setTitleFontSettings()

    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, "center")
}

Scene_Title.prototype.createGameTitleSettings = function(){
    const text = $dataSystem.gameTitle
    const x = 20
    const y = Graphics.height / 4
    const maxWidth = Graphics.width - x * 2

    return [text, x, y, maxWidth]
}

Scene_Title.prototype.setTitleFontSettings = function() {
    const bitmap = this._gameTitleSprite.bitmap
    const titleFont = Plugin.param().fonts.find(font => font.isForGameTitle) || Plugin.param().fonts[0]
    
    bitmap.fontFace = `${titleFont.face}, ${"GameFont"}`
    bitmap.fontItalic = titleFont.italic
    bitmap.fontBold = titleFont.bold
    bitmap.fontSize = titleFont.size
    bitmap.textColor = titleFont.textColor
    bitmap.outlineColor = titleFont.outlineColor
    bitmap.outlineWidth = titleFont.outlineWidth
}

}

/* ------------------------------ SPRITE TIMER ------------------------------ */
{

Alias.Sprite_Timer_createBitmap = Sprite_Timer.prototype.createBitmap
Sprite_Timer.prototype.createBitmap = function() {
    Alias.Sprite_Timer_createBitmap.call(this)
    this.setFontSettings()
}

Sprite_Timer.prototype.setFontSettings = function() {
    const timerFont = $gameTimer.customFont()
    this.bitmap.fontSize = timerFont.size
    this.bitmap.fontFace = timerFont.face
    this.bitmap.fontItalic = timerFont.italic
    this.bitmap.textColor = timerFont.textColor
    this.bitmap.outlineColor = timerFont.outlineColor
    this.bitmap.outlineWidth = timerFont.outlineWidth
}

}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_initialize = Window_Base.prototype.initialize
Window_Base.prototype.initialize = function(x, y, width, height) {
    this.customFont = this.findCustomFont()
    this.gaugeLabelFont = Plugin.param().fonts.find(font => font.isForGaugeLabel) || this.customFont
    this.gaugeValueFont = Plugin.param().fonts.find(font => font.isForGaugeValue) || this.customFont
    this.battlerNameFont = Plugin.param().fonts.find(font => font.isForBattlerName) || this.customFont
    Alias.Window_Base_initialize.call(this, x, y, width, height)
}

Alias.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings
Window_Base.prototype.resetFontSettings = function() {
    Alias.Window_Base_resetFontSettings.call(this)
    this.resetSavedFontChanges()
    this.setCustomFont()
}

Alias.Window_Base_resetTextColor = Window_Base.prototype.resetTextColor
Window_Base.prototype.resetTextColor = function() {
    Alias.Window_Base_resetTextColor.call(this)
    if(this.customFont){
        this.resetCustomFontColors()
    }
}

// Overwrite
Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return 'SimHei, Heiti TC, sans-serif'
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif'
    } else {
        const defaultIndex = Plugin.param().defaultIndex || 0
        return this.customFont ? this.customFont.face : Plugin.param().fonts[defaultIndex].face
    }
}

// Overwrite
Window_Base.prototype.standardFontSize = function() {
    return this.customFont ? this.customFont.size : Plugin.param().fonts[0].size
}

Window_Base.prototype.setCustomFont = function() {
    this.customFont = this.findCustomFont()
    if(this.customFont){
        this.setCustomFontSettings()
    }
}

Window_Base.prototype.setCustomFontSettings = function() {
    const font = this.customFont
    
    this.contents.fontFace = font.face
    this.contents.fontSize = font.size
    //this.contents.textColor = font.textColor
    //this.contents.outlineColor = font.outlineColor
    this.contents.outlineWidth = font.outlineWidth
    this.contents.fontItalic = font.italic
    this.contents.fontBold = font.bold
}

Window_Base.prototype.resetCustomFontColors = function() {
    const font = this.customFont
    this.contents.textColor = font.textColor
    this.contents.outlineColor = font.outlineColor
}

Window_Base.prototype.findCustomFont = function() {
    const savedFontIndex = this.findSavedFont()
    const defaultIndex = Plugin.param().defaultIndex || 0
    const font = Plugin.param().fonts[savedFontIndex] || this.findWindowFont() || this.findSceneFont() || Plugin.param().fonts[defaultIndex]
    
    return font
}

Window_Base.prototype.findSavedFont = function(){
    const sceneName = SceneManager._scene.constructor.name
    const winName = this.constructor.name

    return  Plugin.findSavedFont(sceneName) || Plugin.findSavedFont(winName)
}

Window_Base.prototype.findSceneFont = function(){
    const sceneName = SceneManager._scene.constructor.name
    const font = Plugin.param().fonts.find(font => font.sceneList.includes(sceneName))

    return font
}

Window_Base.prototype.findWindowFont = function(){
    const winName = this.constructor.name
    const font = Plugin.param().fonts.find(font => font.windowList.includes(winName))

    return font
}

Window_Base.prototype.resetSavedFontChanges = function() {
    if(!Plugin.param().saveFontChanges){
        Plugin.removeSavedFont(this.constructor.name)
        Plugin.removeSavedFont(SceneManager._scene.constructor.name)
    }
  
}

}

// TO DO ?
/* ------------------------------ SPRITE GAUGE ------------------------------ */
{

// Window_Base.prototype.setGaugeLabelFontSettings = function() {
//     const font = this.gaugeLabelFont
//     this.contents.fontFace = font.face
//     this.contents.fontItalic = font.italic
//     this.contents.fontSize = font.size
//     this.contents.outlineWidth = font.outlineWidth
//     //this.contents.fontBold = this.gaugeLabelFont.bold
// }

// Window_Base.prototype.setGaugeValueFontSettings = function() {
//     const font = this.gaugeValueFont
//     this.contents.fontFace = font.face
//     this.contents.fontItalic = font.italic
//     this.contents.fontSize = font.size
//     this.contents.outlineWidth = font.outlineWidth
//     //this.contents.fontBold = this.gaugeLabelFont.bold
// }

// Alias.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp
// Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
//     this.setGaugeLabelFontSettings()
//     Alias.Window_Base_drawActorHp.call(this, actor, x, y, width)
//     this.setCustomFontSettings()
// }

// Alias.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp
// Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
//     this.setGaugeLabelFontSettings()
//     Alias.Window_Base_drawActorMp.call(this, actor, x, y, width)
//     this.setCustomFontSettings()
// }

// Alias.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp
// Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
//     this.setGaugeLabelFontSettings()
//     Alias.Window_Base_drawActorTp.call(this, actor, x, y, width)
//     this.setCustomFontSettings()
// }

// Alias.Window_Base_drawCurrentAndMax = Window_Base.prototype.drawCurrentAndMax
// Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y, width, color1, color2) {
//     this.setGaugeValueFontSettings()
//     Alias.Window_Base_drawCurrentAndMax.call(this, current, max, x, y, width, color1, color2)
//     this.setCustomFontSettings()
// }

}

// TO DO ?
/* ------------------------------- SPRITE NAME ------------------------------ */
{

// Window_Base.prototype.setBattlerNameFontSettings = function() {
//     const font = this.battlerNameFont
//     this.contents.fontFace = font.face
//     this.contents.fontItalic = font.italic
//     this.contents.fontSize = font.size
//     this.contents.outlineWidth = font.outlineWidth
//     //this.contents.fontBold = this.gaugeLabelFont.bold
// }

// Alias.Window_Base_drawActorName = Window_Base.prototype.drawActorName
// Window_Base.prototype.drawActorName = function(actor, x, y, width) {
//     //if(Eli.Utils.isScene(Scene_Battle)){
//         this.setBattlerNameFontSettings()
//     //}
    
//     Alias.Window_Base_drawActorName.call(this, actor, x, y, width)
//     this.resetFontSettings()
// }

}

}