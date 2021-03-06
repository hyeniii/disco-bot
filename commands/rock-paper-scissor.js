const { SlashCommandBuilder } = require('@discordjs/builders');

const convertEmoji = (who) => {
    if (who ==='๊ฐ์'){
        return '๐ค';
    }
    else if (who === '๋ฐ์'){
        return '๐';
    }
    else if (who === '๋ณด'){
        return '๐๏ธ';
    }
}

module.exports = {
	data: new SlashCommandBuilder().setName('๊ฐ์๋ฐ์๋ณด')
                                    .setDescription('๋์ค์ฝ๋ด๊ณผ์ ๊ฐ์๋ฐ์๋ณด ๊ฒ์')
                                    .addStringOption(option => option.setName('์นดํ๊ณ ๋ฆฌ')
                                                                    .setDescription('๊ฐ์๋ฐ์๋ณด ์ ํ')
                                                                    .addChoice('๊ฐ์', '๊ฐ์')
                                                                    .addChoice('๋ฐ์','๋ฐ์')
                                                                    .addChoice('๋ณด','๋ณด')),
	async execute(interaction) {
        const human = interaction.options.getString('์นดํ๊ณ ๋ฆฌ');
        const list = ['๊ฐ์', '๋ฐ์','๋ณด'];
        const random = Math.floor(Math.random() * 3);
        const bot = list[random];
        let winner = '';
        if (human === bot){
            winner = '๋น๊น';
        }
        else{
            human === "๊ฐ์" ? (winner = bot === '๋ฐ์'? '๋ด': '์ธ๊ฐ') : '';
            human === "๋ฐ์" ? (winner = bot === '๋ณด'? '๋ด': '์ธ๊ฐ') : '';
            human === "๋ณด" ? (winner = bot === '๊ฐ์'? '๋ด': '์ธ๊ฐ') : '';
        } 
        const result =
        `
        ์ฌ๋: ${convertEmoji(human)} : vs ๋ด: ${convertEmoji(bot)}
        ${winner === '๋น๊น' ? '์ฐ๋ฆฌ๋ ๋น๊ฒผ๋ค ์ธ๊ฐ.' : winner + '์ ์น๋ฆฌ!'}
        `
		await interaction.reply(result);
	},
};