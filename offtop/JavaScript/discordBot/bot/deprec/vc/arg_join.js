const fs = require('fs')

module.exports = {
    name: 'join',
    execute(args, message, channel, client) {

        const audioFiles = fs.readdirSync('../bot/audio1').filter(file => file.endsWith('.mp3'))

        channel.join()
            .then(connection => {
                let number = Math.floor(Math.random() * audioFiles.length)
                let song = audioFiles[number]
                client.vc.np = `${number}. ${song}`
                const dispatcher = connection.play(`../bot/audio1/${song}`)
                dispatcher.setVolume(0.08);
                client.log(__filename, `join started ${song}`);
                dispatcher.on('speaking', (speaking) => {
                    if (!speaking) {
                        client.vc.np = 0;
                        client.vc.playing = false;
                        channel.leave();
                    }
                });
            }).catch(console.error);
        client.functions.sendStr('VC_JOIN_SUCCESS');

        return client;
    }
}