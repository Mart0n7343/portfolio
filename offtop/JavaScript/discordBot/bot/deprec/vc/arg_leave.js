const fs = require('fs')

module.exports = {
    name: 'leave',
    execute(args, message, c, client) {

        let channel;
        const Guild = client.guilds.cache.get(message.guild.id);
        const Member = Guild.members.cache.get('850312763624783872');
        if (Member.voice.channel) {
            try {
                let vc_id = Member.voice.channel.id;
                channel = client.channels.cache.get(vc_id);
            } catch (error) {
                console.log(error)
                client.functions.sendStr('VC_JOIN_ERROR');
                return;
            }
        } else {
            client.functions.sendStr('VC_NO_AUTHOR');
            return;
        }

        channel.leave();
        client.functions.sendStr('VC_LEAVE_SUCCESS');
        client.vc.playing = false;
        client.vc.queue.length = 0;

        return client;
    }
}