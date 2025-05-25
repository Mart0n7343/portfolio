const { VoiceConnection } = require("@discordjs/voice")

module.exports = {
    name: 'np',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `np`',
    description: 'Показывает то, что сейчас играет',
    
    execute(client, message, args) {
        let vcmanager = client.vcmanager.init(message, client);
        if (!vcmanager.nowPlaying) {
            client.functions.sendStr('VC_NP_EMPTY', message.channel);
            return;
        }
        message.channel.sendStrVar('VC_NP', vcmanager.nowPlaying, message.channel);
    }
}