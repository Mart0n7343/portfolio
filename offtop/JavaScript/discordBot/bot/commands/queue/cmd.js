module.exports = {
    name: 'queue',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `queue`',
    description: 'Показывает очередь треков',

    execute(client, message, args) {
        let vcmanager = client.vcmanager.init(message, client);
        if (vcmanager.queue.length < 1) {
            client.functions.sendStr('VC_QUEUE_EMPTY', message.channel);
            return;
        }
        let queue = new Discord.Collection();
        for (let track of vcmanager.queue) {
            queue.set(track, client.vcmanager.tracklist[+track - 1]);
        }
        let fields = [];
        let i = 1;
        for (let [key, value] of queue) {
            fields.push({name: i, value: `${key}: ${value}
                ----------------------------------------`});
            i++;
        }
        const embedMsg = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('**Queue**')
            .setAuthor('йбгдма', 'https://media.discordapp.net/attachments/850313227157372950/860924385103970304/8ebb0770ad1e4097.jpg?width=532&height=676',
                'https://discord.com/api/oauth2/authorize?client_id=850312763624783872&permissions=8&scope=bot')
            .setTimestamp()
            .addFields(fields);

        message.channel.send(embedMsg);
    }
}