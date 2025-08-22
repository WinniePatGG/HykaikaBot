const { SlashCommandBuilder } = require('discord.js');
const FactsManager = require('../utils/FactsManager');

const factsManager = new FactsManager('./facts.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendfact')
        .setDescription('Send a random anime fact for testing'),

    async execute(interaction) {
        const fact = factsManager.getRandomFact();
        await interaction.reply(fact);
    }
};
