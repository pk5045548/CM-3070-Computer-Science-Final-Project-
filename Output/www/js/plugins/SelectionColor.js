/*
 * ==============================================================================
 * * GTP: Gamefall Team Plugins - Command Selection Color
 * ------------------------------------------------------------------------------
 *  SelectionColor.js  Version 1.0
 * ==============================================================================
 */

var Imported = Imported || {};
Imported.SelectionColor = true;
Imported.SelectionColor.version = 1.0;

/*:
* @plugindesc Change the color of the current selection.
* @author Gamefall || Luca
* @help Insert in img/system the image of the background, paying attention
* to the file name.
* -- CHANGELOG --
* Version 1.0 : Plugin is released.
* @param Selection Color
* @desc The number of the selection color.
* Default: 5
* @default 5
*/



// Parameters

var Gamefall = Gamefall || {};
Gamefall.parameters = PluginManager.parameters('SelectionColor');
Gamefall.selectionColor = Number(Gamefall.parameters['Selection Color'] || 5);


Window_Command.prototype.drawItemColored = function(index) {
    
//    if($gameSwitches.value(70))
//    {
//        Gamefall.selectionColor= 8;
//    }
//    else if($gameSwitches.value(71))
//    {
//        Gamefall.selectionColor= 9;
//    }
//    else if($gameSwitches.value(72))
//    {
//        Gamefall.selectionColor= 10;
//    }
    
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    if(this.currentData()) {
        this.changeTextColor(this.textColor(Gamefall.selectionColor));
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);	
    }
};


Window_Command.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.drawAllItems();
    this.drawItemColored(this.index());
};

Window_Command.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};



Window_PartyCommand.prototype.drawItemColored = function(index) {
    
//    if($gameSwitches.value(70))
//    {
//        Gamefall.selectionColor= 8;
//    }
//    else if($gameSwitches.value(71))
//    {
//        Gamefall.selectionColor= 9;
//    }
//    else if($gameSwitches.value(72))
//    {
//        Gamefall.selectionColor= 10;
//    }
    
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    if(this.currentData()) {
        this.changeTextColor(this.textColor(Gamefall.selectionColor));
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);	
    }
};


Window_PartyCommand.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.drawAllItems();
    this.drawItemColored(this.index());
};

Window_PartyCommand.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};