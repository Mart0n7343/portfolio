const fs = require('fs')

let dispatcher;
let song;

module.exports = {
    name: 'play',
    execute(args, message, channel, client) {

        //custom
        let dirNum = 1
        if (args[0] === 'custom') {
            args.shift();
            dirNum = 2;
        }

        const audioFiles = fs.readdirSync(`../bot/audio${dirNum}`).filter(file => file.endsWith('.mp3'));

        //if no arguments
        if (args.length < 1) {
            const cmdFile = require('./cmd.js')
            client.functions.sendStrVar('NOT_ENOUGH_ARGS', cmdFile.syntax)
            return;
        }

        //if playing
        if (client.vc.playing == true) {
            let songKeyArr = [];
            for (let songKey of args) {
                client.vc.queue.push(songKey)
                songKeyArr.push(audioFiles[+songKey - 1])
            }
            client.functions.sendStrVar('VC_PLAY_QUEUE', songKeyArr)
            return;
        }

        //queueing
        for (let songKey of args) {

            //if isn't number
            if (parseInt(songKey) === NaN || parseInt(songKey) <= 0) {
                client.functions.sendStrVar('INVALID_ARG', songKey)
                return;
            }

            //if no file
            if (songKey > audioFiles.length) {
                client.functions.sendStrVar('VC_PLAY_HIGH_NUMBER', audioFiles.length)
                return;
            }
            client.vc.queue.push(songKey)
        }

        channel.join()
            .then(connection => {
                recursion()
                function recursion() {

                    client.vc.playing = true;
                    let songKey = client.vc.queue[0]
                    songKey--;
                    song = audioFiles[songKey]
                    client.log(__filename, `started ${song}`);
                    client.functions.sendStrVar('VC_PLAY_PLAYING', song)
                    client.vc.np = `${songKey}. ${song}`
                    dispatcher = connection.play(`../bot/audio${dirNum}/${song}`)
                    dispatcher.setVolume(0.08);

                    dispatcher.on('finish', () => {
                        client.vc.np = 0;
                        client.log(__filename, `finished ${song}`)
                        client.vc.queue.shift()
                        if (client.vc.queue.length == 0) {
                            channel.leave();
                            client.vc.playing = false;
                        } else {
                            recursion();
                        }
                    })
                };
            }).catch(console.error);

        return client;
    },
    skip() {
        try {
            if (dispatcher) dispatcher.end();
            return song;
        } catch (error) {
            console.log(error)
        }
    }
}