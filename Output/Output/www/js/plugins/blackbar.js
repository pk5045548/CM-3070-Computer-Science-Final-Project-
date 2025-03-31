/*:
* @param image
* @type file
* @dir img/pictures/
* @require 1
*
* @param doRepeat
* @type boolean
* @default true
*/
(() => {
    const PLUGIN_NAME = "BlackBars";

    const parameters = PluginManager.parameters(PLUGIN_NAME);
    parameters.doRepeat = parameters.doRepeat !== "false";

    const body = document.getElementsByTagName("body")[0];

    body.style.backgroundImage = `url(img/pictures/${parameters.image})`;
    body.style.backgroundRepeat = parameters.doRepeat ? "repeat" : "no-repeat";
})();