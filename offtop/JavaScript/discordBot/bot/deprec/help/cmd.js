const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: '\n<:trollface:852032332138545196>',
	syntax: '**Syntax:** +help (command)',
	devPermsRequired: false,
	displayHelpMenu: true,
	execute(client, message, args) {

		if (args.length > 0) {
			const arg = require('./arg_command.js')
			arg.execute(client, args)
			return;
		}

		let cmds = []
		for (let value of client.commands.values()) {
			if (value.displayHelpMenu == false) continue;
			let name = `${value.name}`;
			let description = `${value.syntax}
			${value.description}
			--------------------------------------------------------------`;

			cmds.push({ name: name, value: description })
		}

		let embedMsg = new Discord.MessageEmbed()
			.setColor('#FFFFFF')
			.setTitle('СПИСОК КОМАНД')
			.setAuthor('йбгдма', 'https://media.discordapp.net/attachments/850313227157372950/860924385103970304/8ebb0770ad1e4097.jpg?width=532&height=676', 'https://discord.com/api/oauth2/authorize?client_id=850312763624783872&permissions=8&scope=bot')
			.setThumbnail('https://media.discordapp.net/attachments/704583171353870359/860921233486905354/steve_huis_izza_ugla.png?width=270&height=514')
			.setImage('https://media.discordapp.net/attachments/704583171353870359/860921290617651200/steve_huis_izza_ugla_2.png?width=270&height=514')
			.setTimestamp()
			.setFooter('', 'https://cdn.discordapp.com/emojis/723767670029156392.png?v=1')
			.addFields(cmds);
		message.channel.send(embedMsg);
	}
}