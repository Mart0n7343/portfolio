const fs = require('fs');

module.exports = {
    name: 'save',
    description: '\nСохраняет сообщение в базу по заданому ключу',
	syntax:'\n**Syntax**: `+save [key] [data]`',
	devPermsRequired: false,
	displayHelpMenu: true,
    execute(client, message, args) {

		if (message.attachments.size > 0 && args.length != 0) {
            message.attachments.forEach(attachment => {
                args.push(attachment.url);
            });
        }

		if (args.length < 2) {
			client.functions.sendStrVar('NOT_ENOUGH_ARGS', this.syntax, message.channel)
			return;
		}

		if (args[0].length > 10) {
			client.functions.sendStrVar('SAVE_LONG_KEY', args[0], message.channel)
			return;
		}

		let guildStock = new client.guildStock(client, message.guild);
		if (!guildStock.checkFile()) fs.writeFileSync(this.filepath, JSON.stringify({}));
		guildStock.getContent();
		let key = args.shift();
		guildStock.add(key, args.join(' '));
		guildStock.saveContent();
		client.functions.sendStrVar('SAVE_SUCCESS', key, message.channel);
	}
}