const { Events } = require('discord.js');
const { REACTION_ROLES } = require('../config');

const REACTION_MESSAGE_ID = '1404907415236775958'

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(client, reaction, user) {
        console.log(`[DEBUG] ReactionAdd event fired by ${user.tag || user.id}`);

        if (user.bot) return;

        try {
            if (reaction.partial) {
                console.log("[DEBUG] Fetching partial reaction...");
                await reaction.fetch();
            }
            if (reaction.message.partial) {
                console.log("[DEBUG] Fetching partial message...");
                await reaction.message.fetch();
            }

            console.log(`[DEBUG] Reaction message ID: ${reaction.message.id}`);
            console.log(`[DEBUG] Config message ID: ${REACTION_MESSAGE_ID}`);

            if (reaction.message.id !== REACTION_MESSAGE_ID) {
                console.log("[DEBUG] Message ID does not match");
                return;
            }

            const roleId = REACTION_ROLES[reaction.emoji.name];
            console.log(`[DEBUG] Emoji: ${reaction.emoji.name}, Role ID: ${roleId}`);

            if (!roleId) return;

            const member = await reaction.message.guild.members.fetch(user.id);
            await member.roles.add(roleId);
            console.log(`✅ Added role to ${member.user.tag}`);
        } catch (err) {
            console.error(`❌ Error adding role:`, err);
        }
    }
};
