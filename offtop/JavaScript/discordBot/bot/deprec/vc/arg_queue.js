const Discord = require("discord.js");
const fs = require('fs')

module.exports = {
    name: 'queue',
    async execute(args, message, channel, client) {

        const audioFiles = fs.readdirSync('../bot/audio1').filter(file => file.endsWith('.mp3'));
        
        if (client.vc.queue < 1) {
            client.functions.sendStr('VC_QUEUE_EMPTY')
            return;
        }

        let queue = new Discord.Collection()
        for (let track of client.vc.queue) {
            queue.set(track, audioFiles[+track - 1])
        }
        let fields = [];
        let i = 1;
        for (let [key, value] of queue) {
            fields.push({name: i, value: `${key}: ${value}
                ----------------------------------------`})
            i++;
        }

        const embedMsg = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('**Queue**')
            .setAuthor('йбгдма', 'https://media.discordapp.net/attachments/850313227157372950/860924385103970304/8ebb0770ad1e4097.jpg?width=532&height=676',
                'https://discord.com/api/oauth2/authorize?client_id=850312763624783872&permissions=8&scope=bot')
            .setTimestamp()
            .addFields(fields);

        client.functions.send(embedMsg)
    }
}