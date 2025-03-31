//=============================================================================
// Remove Shadows (Shaz_RemoveShadows.js)
// by Shaz
// Last Updated: 2018.03.06
//=============================================================================

/*:
 * @plugindesc Removes autoshadows
 * @author Shaz
 *
 * @help This plugin has no plugin commands.
 *
 */

var Imported = Imported || {};
Imported.Shaz_RemoveShadows = true;

var Shaz = Shaz || {};
Shaz.RS = Shaz.RS || {};
Shaz.RS.Version = 1.00;

(function() {

    var _Shaz_RS_DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _Shaz_RS_DataManager_onLoad.call(this, object);
        if (object === $dataMap) {
            var indexStart = $dataMap.width * $dataMap.height * 4;
            var indexEnd = $dataMap.width * $dataMap.height * 5;
            for (var i = indexStart; i < indexEnd; i++) {
                $dataMap.data[i] = 0;
            }
        }
    };
})();