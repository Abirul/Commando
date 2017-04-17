const { Command } = require('discord.js-commando');

const Redis = require('../../structures/Redis');
const Tag = require('../../models/Tag');

const redis = new Redis();

module.exports = class TagCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tag',
			group: 'tags',
			memberName: 'tag',
			description: 'Displays a tag.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'name',
					label: 'tagname',
					prompt: 'what tag would you like to see?\n',
					type: 'string',
					parse: str => str.toLowerCase()
				}
			]
		});
	}

	async run(msg, args) {
		const { name } = args;
		const tag = await Tag.findOne({ where: { name, guildID: msg.guild.id } });
		tag.increment('uses');
		return msg.say(tag.content);
	}
};
