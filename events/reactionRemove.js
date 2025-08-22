const { Events } = require('discord.js');
const { REACTION_ROLES } = require('../config');

const REACTION_MESSAGE_ID = '1404907415236775958'

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(client, reaction, user) {
        if (user.bot) return;

        try {
            if (reaction.partial) await reaction.fetch();
            if (reaction.message.partial) await reaction.message.fetch();

            if (reaction.message.id !== REACTION_MESSAGE_ID) return;

            const roleId = REACTION_ROLES[reaction.emoji.name];
            if (!roleId) return;

            const member = await reaction.message.guild.members.fetch(user.id);
            await member.roles.remove(roleId);
            console.log(`✅ Removed role from ${member.user.tag}`);
        } catch (err) {
            console.error(`❌ Error removing role:`, err);
        }
    }
};
