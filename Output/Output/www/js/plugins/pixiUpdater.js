var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** /*:
@help
Created with the guide of this document:
https://fenixenginemv.gitlab.io/guides/pixi5-upgrade.html

Thank you for kickstarting this update plugin.

There was a bit more work that needed to be done, for example
the baseTexture.update() needed to be added to rpg_core's Bitmap
clearRect function. This is because in PIXI 5.3.0 it's slightly
different. That among other basic stuff, like fixing the stretching
issue.

I've uploaded the files to a server that -SHOULD- be on most of the
time, so you shouldn't have any issues.
*/
(function () {
    var globalString = '';
    if (!Utils.isNwjs())
        return;
    var http = require('http');
    var SceneUpdate = /** @class */ (function (_super) {
        __extends(SceneUpdate, _super);
        function SceneUpdate() {
            return _super.call(this) || this;
        }
        SceneUpdate.prototype.start = function () {
            this.win = new WindowData();
            this.addChild(this.win);
            this.wind = new WindowDataCommand(0, 0);
            this.addChild(this.wind);
            this.wind.y = Graphics.boxHeight - this.wind.height;
            this.wind.setHandler('yes', this.confirmStart.bind(this));
            this.wind.setHandler('no', this.closeApp.bind(this));
        };
        SceneUpdate.prototype.confirmStart = function () {
            var _this = this;
            var fs = require('fs');
            this.win.string = "Creating backup files...";
            this.win.showBar = true;
            this.win.barStatus = 0;
            this.wind.close();
            try {
                try {
                    fs.mkdirSync('./js/_backup');
                }
                catch (_a) {
                }
                try {
                    fs.mkdirSync('./js/_backup/libs');
                }
                catch (_b) {
                }
                fs.copyFileSync('./js/main.js', './js/_backup/main.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_core.js', './js/_backup/rpg_core.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_managers.js', './js/_backup/rpg_managers.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_objects.js', './js/_backup/rpg_objects.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_scenes.js', './js/_backup/rpg_scenes.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_sprites.js', './js/_backup/rpg_sprites.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/rpg_windows.js', './js/_backup/rpg_windows.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/libs/pixi.js', './js/_backup/libs/pixi.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/libs/pixi-picture.js', './js/_backup/libs/pixi-picture.js');
                this.win.barStatus += (100 / 12);
                fs.copyFileSync('./js/libs/pixi-tilemap.js', './js/_backup/libs/pixi-tilemap.js');
                this.win.barStatus += (100 / 12);
                try {
                    fs.copyFileSync('./js/libs/pixi.js.map', './js/libs/pixi.js.map');
                    this.win.barStatus += (100 / 12);
                }
                catch (e) {
                }
                try {
                    fs.copyFileSync('./js/libs/pixi-tilemap.js.map', './js/libs/pixi-tilemap.js.map');
                    this.win.barStatus += (100 / 12);
                }
                catch (e) {
                }
            }
            catch (e) {
                console.log(e);
            }
            this.win.string = "Copying files modifications for version 5.3.3...";
            this.win.barStatus = 0;
            var $ = this.win;
            var loadFromUrl = function (c, dir) {
                var loadFinished = 0;
                var endData = {};
                var endCount = c.length;
                var add = dir || '';
                var _loop_1 = function (i) {
                    http.get("https://pixijs.download/v5.3.5/pixi.js" + add + i, function (res) {
                        var rawData = '';
                        _this.win.string = "Copying " + add + i;
                        _this.win.barStatus = 0;
                        res.on('data', function (chunk) { rawData += chunk; });
                        res.on('end', function () {
                            endData["" + add + i] = rawData;
                            loadFinished++;
                            if (loadFinished == endCount) {
                                var scanned = 0;
                                var _loop_2 = function (j) {
                                    try {
                                        fs.writeFileSync("./js/" + j, endData[j]);
                                        $.string = "Coppied " + j + ".";
                                        if (scanned === Object.keys(endData).length - 1) {
                                            _this.win.string = "File transfer complete. Fixing HTML file...";
                                            fs.readFile('./index.html', function (err, data) {
                                                if (err)
                                                    throw err;
                                                fs.copyFileSync('./index.html', './index_backup.html');
                                                var d = data.toString();
                                                d = d.replace("<script type=\"text/javascript\" src=\"js/libs/pixi-picture.js\"></script>", '');
                                                fs.writeFile('./index.html', d, function (err) {
                                                    if (err)
                                                        throw err;
                                                    location.reload();
                                                });
                                            });
                                        }
                                        scanned++;
                                    }
                                    catch (e) {
                                        if (fs.statSync("./js/" + j).isDirectory()) {
                                            http.get("https://pixijs.download/v5.3.5/pixi.js", function (res) {
                                                var rawData = '';
                                                _this.win.barStatus = 0;
                                                res.on('data', function (chunk) { rawData += chunk; });
                                                res.on('end', function () {
                                                    loadFromUrl(JSON.parse(rawData), j + "/");
                                                });
                                            });
                                        }
                                    }
                                };
                                for (var j in endData) {
                                    _loop_2(j);
                                }
                            }
                        });
                    });
                };
                for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
                    var i = c_1[_i];
                    _loop_1(i);
                }
            };
            http.get('https://pixijs.download/v5.3.5/pixi.js', function (res) {
                var rawData = '';
                _this.win.barStatus = 0;
                res.on('data', function (chunk) { rawData += chunk; });
                res.on('end', function () {
                    loadFromUrl(JSON.parse(rawData), null);
                });
            });
        };
        SceneUpdate.prototype.closeApp = function () {
            SceneManager.terminate();
        };
        return SceneUpdate;
    }(Scene_Base));
    var WindowData = /** @class */ (function (_super) {
        __extends(WindowData, _super);
        function WindowData() {
            var _this = _super.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight) || this;
            _this.refresh();
            _this.opacity = 0;
            _this.string = "There is an update for PIXI.JS! \\c[4]5.3.0\\c[0]\nYou're using version \\c[4]" + PIXI.VERSION + "\\c[0]. Would you\nlike to update?\n\nWarning: This may corrupt data. To protect your data, a\nbackup file of all of the files that will be\nreplaced will be created.\n\nIf this happens, you can restore your previous\nfiles by copying them from the '_backup' folder\nlocated in your js folder.";
            _this.showBar = false;
            _this.barStatus = 50;
            return _this;
        }
        WindowData.prototype.refresh = function () {
            this.contents.clear();
            this.drawTextEx(this.string, 0, 0);
            if (this.showBar == true) {
                this.contents.fillRect(0, this.contents.height / 2, this.contents.width, 24, '#333333');
                var fillWidth = (this.barStatus / 100) * (this.contents.width - 2);
                this.contents.fillRect(1, 1 + (this.contents.height / 2), fillWidth, 24, '#ff1000');
            }
        };
        WindowData.prototype.update = function () {
            this.refresh();
        };
        return WindowData;
    }(Window_Base));
    var WindowDataCommand = /** @class */ (function (_super) {
        __extends(WindowDataCommand, _super);
        function WindowDataCommand(x, y) {
            return _super.call(this, x, y) || this;
        }
        WindowDataCommand.prototype.makeCommandList = function () {
            this.addCommand('Proceed', 'yes');
            this.addCommand('Close', 'no');
        };
        return WindowDataCommand;
    }(Window_Command));
    var currentVersion = Number(PIXI.VERSION.replace(/\./g, ''));
    if (currentVersion < 530) {
        (function () {
            var sti = Scene_Boot.prototype.start;
            Scene_Boot.prototype.start = function () {
                sti.call(this);
                SceneManager.push(SceneUpdate);
            };
        })();
    }
})();
