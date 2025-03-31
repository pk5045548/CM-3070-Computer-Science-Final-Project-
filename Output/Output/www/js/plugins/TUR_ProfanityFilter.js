"use strict";
//=============================================================================
// Profanity Filter
// TUR_ProfanityFilter.js
//=============================================================================

window.Imported = window.Imported || {};
Imported.TUR_ProfanityFilter = true;

window.TUR = window.TUR || {};
TUR.ProfanityFilter = TUR.ProfanityFilter || {};
TUR.ProfanityFilter.version = 1.1;

/*:
 * @plugindesc Censor offensive words in game dialogue.
 * @author ATT_Turan
 * @url https://forums.rpgmakerweb.com/index.php?threads/profanity-filter-mv-mz.162730/
 * @version 1.1
 * @target MV
 * @target MZ
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin provides you the option for a profanity filter in your game.
 * It will appear in the options menu of your game for the player to turn on
 * and off. 
 *
 * You must configure the Profanities parameter to provide a list of words
 * your project uses that you wish to change with the filter turned on. You
 * also have several options for the filtering style. You can turn all 
 * profanities into the same censored word; replace words with a generic
 * character that preserves the length of the word; or with random grawlix.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.1:
 * - Modified the matching expression for languages with non-Latin characters
 *
 * Version 1.0:
 * - Release version
 *
 * @param Profanities
 * @type string
 * @desc The list of words to replace, separated by spaces.
 * @default darn heck crud
 *
 * @param Replacement
 * @type select
 * @desc What to replace profanities with. You can choose from grawlix, a word, or a repeated character.
 * @option Grawlix
 * @option Word
 * @option Character
 * @default Word
 *
 * @param ReplacementWord
 * @type string
 * @desc The word to replace profanities with. Only works when the appropriate option is chosen above.
 * @default CENSORED
 *
 * @param ReplacementCharacter
 * @type string
 * @desc The character to replace profanities with. Only works when the appropriate option is chosen above.
 * @default -
 *
 */

TUR.ProFilParams = PluginManager.parameters('TUR_ProfanityFilter');

ConfigManager.profanityFilter = false;

TUR.makeData = ConfigManager.makeData;
ConfigManager.makeData = function()
{
	let config = TUR.makeData.call(this);
	config.profanityFilter = this.profanityFilter;
	return config;
};

TUR.applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config)
{
	TUR.applyData.call(this, config);
	this.profanityFilter = this.readFlag(config, 'profanityFilter');
};

TUR.addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() 
{
	TUR.addGeneralOptions.call(this);
	this.addCommand("Profanity Filter", 'profanityFilter');
};

Game_Message.prototype.add = function(text) 
{
	if (ConfigManager.profanityFilter)
	{
//		let replacement = text.replace(/[^a-zA-Z0-9 ]/g, '').split(" ");
		let replacement = text.replace(/[^\p{L}0-9 ]/gu, '').split(" ");
		for (const word of replacement)
		{
			if (word.length>1 && TUR.ProFilParams.Profanities.includes(word.toLowerCase()))
				text = text.replace(word, TUR.replacement(word));
		}
	}
    this._texts.push(text);
	
};

TUR.replacement = function(word)
{
	switch (TUR.ProFilParams.Replacement)
	{
		case "Grawlix":
			let newWord = "";
			for (let i=0; i<word.length; i++)
				newWord+=["!", "@", "#", "$", "%", "^", "&", "*"][Math.randomInt(8)];
			word = newWord;
			break;
		case "Word":
			word = TUR.ProFilParams.ReplacementWord;
			break;
		case "Character":
			word = TUR.ProFilParams.ReplacementCharacter.repeat(word.length);
			break;
	}
	return word;
};