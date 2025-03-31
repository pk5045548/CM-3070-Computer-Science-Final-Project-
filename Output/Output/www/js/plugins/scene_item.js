// By Eliaquim
Scene_Item.prototype.start = function() {
    alias.call(this);
     if($gameSwitches.value(181)){
        this._categoryWindow.selectSymbol('keyItem');
        $gameVariables.setValue(181, true);
    /}
};