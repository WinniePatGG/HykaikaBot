const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { REACTION_ROLES, TARGET_CHANNEL_ID } = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('postroles')
        .setDescription('Post the reaction role message (Admin only)'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.editReply("❌ You don't have permission.");
        }

        const channel = await interaction.client.channels.fetch(TARGET_CHANNEL_ID);

        let description = "🎯 **React to get a role!**\n\n";
        for (let [emoji, roleId] of Object.entries(REACTION_ROLES)) {
            const role = interaction.guild.roles.cache.get(roleId);
            description += `${emoji} ${role ? role.name : "Unknown Role"}\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle("📌 Reaction Roles")
            .setDescription(description)
            .setColor("Blue")
            .setFooter({ text: "Click the reactions below to get your roles" });

        const msg = await channel.send({ embeds: [embed] });
        interaction.client.reactionMessageId = msg.id;

        const configPath = path.join(__dirname, '../config.js');
        let configFile = fs.readFileSync(configPath, 'utf8');
        configFile = configFile.replace(/REACTION_MESSAGE_ID:\s*".*"/, `REACTION_MESSAGE_ID: "${msg.id}"`);
        fs.writeFileSync(configPath, configFile);

        for (let emoji of Object.keys(REACTION_ROLES)) {
            await msg.react(emoji);
        }

        await interaction.editReply("✅ Reaction role message sent.");
    }
};
