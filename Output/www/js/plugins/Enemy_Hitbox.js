///*:
// * @plugindesc Adjusts skill targeting by considering hitbox offsets for enemies when a skill is used.
// * @author YourName
// * 
// * @help
// * This plugin modifies the skill targeting logic to take into account
// *  hitbox offsets when targeting enemies. This can be useful when you
// *  have irregularly shaped or positioned enemies and want the skill 
// *  targeting to match their actual position or size on the map.
// * 
// * To use this plugin, place it in your `js/plugins` directory
// *  and enable it in the Plugin Manager.
// * 
// * You can define custom hitbox offsets for each enemy in the database 
// *  by using the following notetags:
// * 
// *   <HitboxOffsetX: x>
// *   <HitboxOffsetY: y>
// * 
// *   Where "x" is the horizontal offset (in pixels) and "y" is the vertical
// *   offset (in pixels). These notetags can be added in the Notes section of
// *   each enemy in the database.
// * 
// * @param DefaultHitboxOffsetX
// * @text Default Horizontal Hitbox Offset
// * @desc Default horizontal offset for enemy hitboxes (in pixels).
// * @type number
// * @default 0
// * 
// * @param DefaultHitboxOffsetY
// * @text Default Vertical Hitbox Offset
// * @desc Default vertical offset for enemy hitboxes (in pixels).
// * @type number
// * @default 0
// */
//
//(function() {
//    // Default offsets, can be modified via plugin parameters
//    const parameters = PluginManager.parameters('Enemy_Hitbox');
//    const defaultOffsetX = Number(parameters['DefaultHitboxOffsetX'] || 0);
//    const defaultOffsetY = Number(parameters['DefaultHitboxOffsetY'] || 0);
//
//    // Extend Game_Enemy to include custom offsets
////    const _Game_Enemy_initialize = Game_Enemy.prototype.initialize;
////    Game_Enemy.prototype.initialize = function(index, enemyId) {
////        _Game_Enemy_initialize.call(this, index, enemyId);
////        this._hitboxOffsetX = defaultOffsetX;
////        this._hitboxOffsetY = defaultOffsetY;
////        
////        // Ensure the enemy data is available and then read the notetags
////        if ($dataEnemies[enemyId]) {
////            this.readHitboxOffsetsFromNotetags(enemyId);
////        }
////    };
////
////    // Function to read the hitbox offsets from the enemy's notetags
////    Game_Enemy.prototype.readHitboxOffsetsFromNotetags = function(enemyId) {
////        const enemy = $dataEnemies[enemyId];
////
////        // Check if the enemy data exists
////        if (!enemy) {
////            console.warn(`Enemy with ID ${enemyId} does not exist!`);
////            return;
////        }
////
////        const note = enemy.note;
////
////        // Match the notetag pattern <HitboxOffsetX: x> and <HitboxOffsetY: y>
////        const offsetXMatch = note.match(/<HitboxOffsetX:\s*(-?\d+)>/i);
////        const offsetYMatch = note.match(/<HitboxOffsetY:\s*(-?\d+)>/i);
////
////        // Apply custom offsets if present in the notetags
////        if (offsetXMatch) {
////            this._hitboxOffsetX = Number(offsetXMatch[1]);
////        }
////        if (offsetYMatch) {
////            this._hitboxOffsetY = Number(offsetYMatch[1]);
////        }
////    };
//
//    // Modify the logic for skill targeting based on hitbox offsets when the skill is used
//    const _Game_Action_apply = Game_Action.prototype.apply;
//    Game_Action.prototype.apply = function(target) {
//        // Apply the skill normally
//        _Game_Action_apply.call(this, target);
//
//        console.log(target);
//        // If the target is an enemy and has a custom hitbox offset, adjust the targeting
//        if (target instanceof Game_Enemy) {
//            const offsetX = target._hitboxOffsetX;
//            const offsetY = target._hitboxOffsetY;
//
//            // If the offset is set, adjust the position where the skill will hit the enemy
//            if (offsetX !== 0 || offsetY !== 0) {
//                // Example: Adjust skill effect position based on hitbox offset
//                // You may need to update this based on how you want the skill effect to interact
//                const newX = target._screenX + offsetX;
//                const newY = target._screenX + offsetY;
//                
//                // You could modify the skill's visual effects or targeting area here
//                // For example, move the skill effect to the new adjusted position (newX, newY)
//                // If necessary, customize this part for your specific game needs.
//                
//                console.log(`Applying skill to ${target.name()}: Offset applied to position (${newX}, ${newY})`);
//            }
//        }
//    };
//
//})();
