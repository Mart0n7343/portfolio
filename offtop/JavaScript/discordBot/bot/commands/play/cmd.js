module.exports = {
    name: 'play',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `play [numbers]`',
    description: 'Играет трек под заданным номером (либо случайный если номер не предоставлен)',
    
    async execute(client, message, args) {
        let vcmanager = client.vcmanager.init(message, client);
        let channel = vcmanager.getChannel(client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id), true);
        let joinProm = await vcmanager.join(channel);
        if (typeof joinProm.length < 2) {
            if (joinProm.message.has('You do not have permission to join this voice channel')) {
                client.functions.send(`нет прав заходить в \`${channel.name}\``, message.channel);
                return;
            }
        }
        let connection = joinProm[0];
        channel = joinProm[1];
        if (args[0] === 'random' || args.length == 0) {
            vcmanager.addToQueue(client.vcmanager.tracklist()[Math.floor(Math.random() * client.vcmanager.tracklist().length)]);
        } else {
            let j = 0;
            let songs = [];
            for (let arg of args) {
                if (arg <= client.vcmanager.tracklist().length) {
                    vcmanager.addToQueue(client.vcmanager.tracklist()[arg - 1]);
                    j++;
                    songs.push(client.vcmanager.tracklist()[arg - 1]);
                }
            }
            if (j == 0) {
                client.functions.sendStr('INVALID_ARGS', message.channel);
                return;
            }
            client.functions.sendStrVar('VC_PLAY_QUEUE', songs.join(', ').toString(), message.channel);
        }
        vcmanager.play(connection, channel, true);
    }
}