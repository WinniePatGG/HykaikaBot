const { Events, ChannelType } = require('discord.js');

const JOIN_TO_CREATE_CHANNEL_ID = "1404065295890649089"

let createdChannels = {};

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(client, oldState, newState) {
        if (newState.channelId === JOIN_TO_CREATE_CHANNEL_ID) {
            const guild = newState.guild;
            const category = newState.channel.parent;

            const tempChannel = await guild.channels.create({
                name: `${newState.member.user.username}'s Channel`,
                type: ChannelType.GuildVoice,
                parent: category
            });

            await newState.member.voice.setChannel(tempChannel);
            createdChannels[newState.member.id] = tempChannel.id;
        }

        if (oldState.channelId && Object.values(createdChannels).includes(oldState.channelId)) {
            const channel = oldState.channel;
            if (channel.members.size === 0) {
                await channel.delete();
                for (let [key, value] of Object.entries(createdChannels)) {
                    if (value === channel.id) delete createdChannels[key];
                }
            }
        }
    }
};
