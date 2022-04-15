const { SlashCommandBuilder } = require('@discordjs/builders');
const quiz = require("../data/quiz.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Reply to a quiz'),

	async execute(interaction) {
        const item = quiz[Math.floor(Math.random() * quiz.length)]
        const limit = 5; // 제한시간
        const filter = response => {
            console.log('response', response);
            return item.answer.some(answers => answers.toLowerCase() === response.content.toLowerCase());
        };
        
        return interaction.reply(`${item.question} + {제한시간: ${limit}초}`, {fetchReply: true})
            .then(() => {
                console.log("Waiting");
                interaction.channel.awaitMessages({filter, max: 1, time: limit * 1000, errors: ['time']})
                    .then(collected => {
                        console.log("Print")
                        interaction.followUp(`${collected.first().author} 정답!`);
                    })
                    .catch(collected => {
                        console.log('catch');
                        interaction.followUp('제한시간이 지났습니다!');
                    });
        });
	},
};