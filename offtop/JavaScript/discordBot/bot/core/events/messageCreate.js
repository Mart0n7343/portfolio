const fs = require('fs');
const CHANCE = 25;

module.exports = class {

    static name = 'messageCreate';
    
    static execute(client, message) {

        let commandManager = new client.commandManager(client);
        commandManager.execute(message);

        let fetcher = new client.fetcher(client, message);
        fetcher.execute();

        this.action(Math.floor(Math.random() * CHANCE), Math.floor(Math.random() * 36e5), client, message);
    }

    static action(chance, time, client, message) {
        let sendTime = new Date().getTime() + time;
        sendTime = new Date(sendTime);
        switch(chance) {
            case 1:
                {
                    this.mergedImg(time, client, message, sendTime);
                    break;
                }
            case 2:
                {
                    this.att(time, client, message, sendTime);
                    break;
                }
            case 3:
                {
                    this.mergedImg(time, client, message, sendTime);
                    break;
                }
            case 4:
                {
                    this.mergedImg(time, client, message, sendTime);
                    break;
                }
            case 5:
                {
                    this.mergedImg(time, client, message, sendTime);
                    break;
                }
        }
    }

    static mergedImg(time, client, message, sendTime) {
        client.log(__filename, `Expected to send merged images at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()}`);
        setTimeout(async() => {
            let imgs = [];
            imgs.push(client.imageManipulator.getRandomImg(message.guild.id));
            imgs.push(client.imageManipulator.getRandomImg(message.guild.id));
            if(Math.floor(Math.random() * 2) == 0) {
                imgs.push(client.imageManipulator.getRandomImg(message.guild.id));
            }
            let mainImg = imgs.shift();
            let imageManipulator = new client.imageManipulator(client, mainImg, imgs, null);
            const merged_img = await imageManipulator.execute(message.channel);
            message.channel.send(merged_img);
        }, time);
    }

    static att(time, client, message, sendTime) {
        let type = client.fetcher.ALLOWED_TYPES[Math.floor(Math.random() * client.fetcher.ALLOWED_TYPES.length)];
        const path = `./resources/guildData/${message.guild.id}/fetched.json`;
        if(!fs.existsSync(path)) return;
        let fileContent = JSON.parse(fs.readFileSync(path), 'utf-8');
        if(fileContent[type].length == 0) return;
        client.log(__filename, `Expected to send an attachment at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()}`);
        setTimeout(() => {
            let arr = fileContent[type];
            let att = arr[Math.floor(Math.random() * arr.length)];
            message.channel.send(att);
        }, time);
    }

    static vcJoin(time, client, message, sendTime) {
        client.log(__filename, `Expected to join a vc at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()}`);
        setTimeout(async() => {
            let usersInVC = [];
            let Guild = client.guilds.cache.get(message.guild.id);
            for(let memberID of Guild.members.cache.keys()) {
                let member = Guild.members.cache.get(memberID);
                if(member.voice.channel) {
                    usersInVC.push(member);
                }
            }
            if(usersInVC.length > 0) {
                let vcmanager = client.vcmanager.init(message, client);
                if(vcmanager.isPlaying) {
                    client.log(__filename, `Failed to join a vc: is already playing`);
                    return;
                }
                let channel = vcmanager.getChannel(usersInVC[Math.floor(Math.random() * usersInVC.length)])
                let joinProm = await vcmanager.join(channel);
                if(typeof joinProm.length < 2) return;
                let connection = joinProm[0];
                channel = joinProm[1];
                let song = client.vcmanager.tracklist()[Math.floor(Math.random() * client.vcmanager.tracklist().length)];
                vcmanager.addToQueue([song]);
                vcmanager.play(connection, channel, false);

            } else client.log(__filename, `Failed to join a vc: no users in vc`);
        }, time);
    }
}
