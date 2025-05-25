module.exports = { 
    name: 'leave',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `leave`',
    description: 'Выходит из голосового канала',
    
    execute(client, message, args) {
        let vcmanager = client.vcmanager.init(message, client);
        let channel = vcmanager.getChannel(client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id), true);
        vcmanager.leave(channel, true);
    }
}