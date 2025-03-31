

Window_BattleLog.prototype.drawBackground = function() {
    if (this.numLines() > 0) {
        this.opacity = 255;
        const padding = this.padding + this.itemPadding();
        const ww = this.maxLineWidth() + padding * 2;
        const wx = (Graphics.boxWidth - ww) / 2;
        this.move(wx, this.y, ww, this.fittingHeight(this.numLines()));
    } else {
        this.opacity = 0;
    }
};

Window_BattleLog.prototype.maxLineWidth = function() {
    let width = 0;
    for (const line of this._lines) {
        width = Math.max(width, this.textSizeEx(line).width);
    }
    return width;
};

