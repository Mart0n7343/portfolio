const Discord = require("discord.js");

module.exports = {
    execute(client, args) {

        const command = args[0]

        //if invalid command
        if (!client.commands.has(command)) {
            client.functions.sendStrVar('INVALID_CMD', command)
			return;
        }

        let embedMsg = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle(client.commands.get(command).name)
            .setAuthor('йбгдма', 'https://media.discordapp.net/attachments/850313227157372950/860924385103970304/8ebb0770ad1e4097.jpg?width=532&height=676', 'https://discord.com/api/oauth2/authorize?client_id=850312763624783872&permissions=8&scope=bot')
            .setTimestamp()
            .addFields({name: client.commands.get(command).syntax, value: client.commands.get(command).description})

        client.functions.send(embedMsg);
    }
}