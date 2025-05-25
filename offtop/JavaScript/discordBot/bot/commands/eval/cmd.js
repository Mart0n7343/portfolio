const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'eval',
    description: 'dev tool',
    syntax: undefined,
    devPermsRequired: true,
    displayHelpMenu: false,
    execute(client, message, args) {
        try {
            eval(args.join(' '));
            message.channel.send('<:white_check_mark:857539078076760075>');
        } catch(err) {
            client.log(__filename, err.message);
            message.channel.send(`${error}`);
        }
    }
}