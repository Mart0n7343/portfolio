const fs = require('fs');

module.exports = {
    execute(client, message, randomTime) {
		
        if (message.author.bot) return;

        const guildFile = `../bot/attachmentArrays/${message.guild.id}.json`;
		const file = JSON.parse(fs.readFileSync(guildFile, 'utf-8'));
		if (file.attachmentsArray.length == 0) return;

		let sendTime = new Date().getTime() + randomTime;
        sendTime = new Date(sendTime); 
		client.log(__filename, `Expected to send an attachment at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()}`);

		setTimeout(() => {

			let random_att = file.attachmentsArray[Math.floor(Math.random() * file.attachmentsArray.length)];
				message.channel.send(`${random_att}`);
				client.log(__filename, `Attachment sent in ${message.channel.id}/${message.channel.name}: ${random_att}`)

		}, randomTime);
		
    }
}