const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote!!'),

	async execute(interaction) {

        const description = interaction.content.substring(6);
        const vote_embed = new MessageEmbed()
            .setTitle("👇 투표합시다")
            .setDescription(description)
            .setColor('RED');

        await interaction.reply({embeds: [vote_embed]})
	},
};