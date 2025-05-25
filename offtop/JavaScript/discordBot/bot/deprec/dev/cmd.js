const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'dev',
    description: 'dev tools',
    syntax: undefined,
    devPermsRequired: true,
    displayHelpMenu: false,
    execute(client, message, args) {

        //if no args
        if (args.length < 1) {
            client.functions.sendStrVar('NO_ARG', '');
            return;
        }

        //collection of arguments
        let arguments = new Discord.Collection();
        const argFiles = fs.readdirSync(`./commands/dev`).filter(file => file.startsWith('arg'));
        for (const file of argFiles) {
            const arg = require(`./${file}`);
            arguments.set(arg.name, arg);
        }
        const argument = args[0];
        args.shift();

        //invalid arg
        if (!arguments.has(argument)) {
            client.functions.sendStrVar('INVALID_ARG', argument);
            return;
        }

        //executing argument
        try {
            arguments.get(argument).execute(args, message, client)
        } catch (error) {
            console.log(error)
        }
    }

}