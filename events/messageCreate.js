const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(client, message) {
        if (!message.guild || message.author.bot) return;

        if (message.content === "!postroles") {
            const command = require('../commands/postroles.js');
            await command.execute(message);
        }
    }
};
