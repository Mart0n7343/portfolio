const fs = require('fs');

module.exports = {
    execute(client, message, randomTime) {

        if (typeof randomTime != Number) randomTime = parseInt(randomTime);

        let audioNumber = 1;
        let randomNum = Math.floor(Math.random() * 4);
        if (randomNum == 3) audioNumber = 2;

        let sendTime = new Date().getTime() + randomTime;
        sendTime = new Date(sendTime);
        client.log(__filename, `Expected to join a vc at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()} (dir: ${audioNumber})`);

        setTimeout(() => {

            if (client.vc.playing === true) {
                client.log(__filename, `Failed to join a vc (dir: ${audioNumber}): is already playing`);
                return;
            }
            const Guild = client.guilds.cache.get(message.guild.id);
            let memberArr = [];
            for (let memberID of Guild.members.cache.keys()) {
                let Member = Guild.members.cache.get(memberID);
                if (Member.voice.channel) {
                    memberArr.push(Member);
                }
            }
            if (memberArr.length > 0) {
                let Member = memberArr[Math.floor(Math.random() * memberArr.length)];
                const audioFiles = fs.readdirSync(`../bot/audio${audioNumber}`).filter(file => file.endsWith('.mp3'));
                let vc_id = Member.voice.channel.id;
                let channel = client.channels.cache.get(vc_id);
                try {
                    channel.join()
                        .then(connection => {
                            client.vc.playing = true;
                            let song = audioFiles[Math.floor(Math.random() * audioFiles.length)]
                            const dispatcher = connection.play(`../bot/audio${audioNumber}/${song}`)
                            dispatcher.on('finish', () => {
                                channel.leave();
                            })
                            client.log(__filename, `Playing ${song}`);
                        }).catch(console.error);
                } catch (error) {
                    if (error.message.has('You do not have permission to join this voice channel')) {
                        client.functions.send(`нет прав заходить в \`${channel.name}\``);
                        return;
                    }
                }
            } else {
                client.log(__filename, `Failed to join a vc (dir: ${audioNumber}): no users in vc`);
            }
        }, randomTime);
    }
}
