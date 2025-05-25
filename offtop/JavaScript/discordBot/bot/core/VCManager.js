const fs = require('fs');

module.exports = class {
    static guildCollection;
    
    client;
    channel;
    queue = [];
    nowPlaying;
    isPlaying = false;
    dispatcher;


    constructor(client, channel) {
        this.client = client;
        this.channel = channel;
    }

    async join(channel) {
        try {
            let connection = await channel.join();
            return [connection, channel];
        } catch (error) {
            return [error];
        }
    }

    async leave(channel, toSendStr = false) {
        await channel.leave();
        if (toSendStr) this.client.functions.sendStr('VC_LEAVE_SUCCESS', this.channel);
        this.isPlaying = false;
        this.nowPlaying = null;
        this.queue.length = 0;
    }

    play(connection, channel, toSendStr = true) {
        let song = this.queue[0];
        this.dispatcher = connection.play(`../bot/resources/audio/${song}`);
        this.client.log(__filename, `Playing ${song}`);
        if (toSendStr) this.client.functions.sendStrVar('VC_PLAY_PLAYING', song, this.channel);
        this.isPlaying = true;
        this.nowPlaying = `${this.client.vcmanager.tracklist().indexOf(song)}: ${song}`;
        this.dispatcher.setVolume(0.08);
        this.queue.shift();
        this.dispatcher.on('finish', () => {
            this.client.log(__filename, `Finished playing ${song}`)
            if (this.queue.length > 0) {
                this.play(connection);
            } else {
                this.leave(channel);
            }
        });
    }

    addToQueue(song) {
        this.queue.push(song);
    }

    skip() {
        try {
            if (this.dispatcher) this.dispatcher.end();
            this.client.functions.sendStrVar('VC_SKIP', this.queue[0], this.channel);
        } catch (error) {
            console.log(error)
        }
    }


    getChannel(member, toSendStr = false) {
        if (member.voice.channel) {
            try {
                let channel = this.client.channels.cache.get(member.voice.channel.id);
                return channel;
            } catch (error) {
                console.log(error)
                if (toSendStr) this.client.functions.sendStr('VC_JOIN_ERROR', this.channel);
                return null;
            }
        } else {
            if (toSendStr) this.client.functions.sendStr('VC_NO_AUTHOR', this.channel);
            return null;
        }
    }

    static init(message, client) {
        if (!exports.guildCollection) {
            exports.guildCollection = new Map();
        }
        if (!exports.guildCollection.has(message.guild.id) ?? false) {
            exports.guildCollection.set(message.guild.id, new client.vcmanager(client, message.channel));
        }
        return exports.guildCollection.get(message.guild.id);
    }

    static tracklist() {
        return fs.readdirSync(`../bot/resources/audio`).filter(file => file.endsWith('.mp3'));
    }
}