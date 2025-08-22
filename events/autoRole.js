const { Events } = require('discord.js');

const AUTO_ROLE_ID = '1403827704557473912'

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        try {
            const role = member.guild.roles.cache.get(AUTO_ROLE_ID);
            if (!role) {
                console.warn(`[AUTO-ROLE] Role with ID ${AUTO_ROLE_ID} not found in guild ${member.guild.name}`);
                return;
            }

            await member.roles.add(role);
            console.log(`[AUTO-ROLE] Gave role "${role.name}" to ${member.user.tag}`);
        } catch (err) {
            console.error(`[AUTO-ROLE] Error assigning role:`, err);
        }
    }
};
