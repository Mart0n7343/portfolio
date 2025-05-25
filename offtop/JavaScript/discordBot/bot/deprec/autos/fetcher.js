const fs = require('fs');

module.exports = {
    execute(client, message) {

        if (message.author.bot) return;

        let guildFile = `../bot/attachmentArrays/${message.guild.id}.json`

		if (!(fs.existsSync(guildFile))) {
			let Obj = class {
				attachmentsArray = []
			}
			fs.writeFileSync(guildFile, JSON.stringify(new Obj))
		};

		let file = JSON.parse(fs.readFileSync(guildFile, 'utf-8'))

		//max attachmentsArray length
		while (file.attachmentsArray.length > 99) {
			file.attachmentsArray.shift();
		};

		//gif
		if (message.content.startsWith('https://tenor.com/view/') || message.content.startsWith('https://media.discordapp.net/attachments/')) {
			let att = message.content;
			client.log(__filename, `New attachment saved in ${message.guild.id}/${message.guild.name}: ${att}`);
			file.attachmentsArray.push(att);
		};

		//emoji
		if (message.content.startsWith('<:') && message.content.endsWith('>')) {
			let att = message.content;
			client.log(__filename, `New emoji saved in ${message.guild.id}/${message.guild.name}: ${att}`);
			file.attachmentsArray.push(att);
		};

		//attached images
		if (message.attachments.size > 0) {
			message.attachments.forEach(attachment => {
				let width = attachment.width;
				let height = attachment.height;
				let att = attachment.url.concat(`?width=${width}&height=${height}`)
				client.log(__filename, `New attachment saved in ${message.guild.id}/${message.guild.name}: ${att}`);
				file.attachmentsArray.push(att);
			});
		};

        fs.writeFileSync(guildFile, JSON.stringify(file));
    }
}