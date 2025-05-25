const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'vc',
    description: `\nАргументы:
    1. join - присоединяется к голосовому каналу
    2. leave - выходит из голосового канала
    3. play (custom) [номер] - играет трек под заданным номером
    4. list (custom) (страница) - список треков
    5. np - показывает сейчас играющий трек
    6. skip - пропускает сейчас играющий трек
    7. queue - очередь треков
    8. add [ссылка/вложение]- добавляет файл в список custom`,
    syntax: '**Syntax**: `+vc [argument]`',
    devPermsRequired: false,
    displayHelpMenu: true,
    async execute(client, message, args) {

        //no arg
        if (args.length < 1) {
            client.functions.sendStrVar('NO_ARG', this.syntax);
            return;
        }

        //collection of arguments
        let arguments = new Discord.Collection();
        const argFiles = fs.readdirSync(`./cmds/vc`).filter(file => file.startsWith('arg'));
        for (const file of argFiles) {
            const arg = require(`./${file}`);
            arguments.set(arg.name, arg);
        }
        const argument = args[0];
        args.shift();

        //invalid arg
        if (!arguments.has(argument) && !message.author.bot) {
            client.functions.sendStrVar('INVALID_ARG', argument);
            return;
        }

        let channel;
        if (argument != 'list' && argument != 'queue') {
            const Guild = client.guilds.cache.get(message.guild.id);
            const Member = Guild.members.cache.get(message.author.id);
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
        }

        //executing argument
        try {
            arguments.get(argument).execute(args, message, channel, client)
        } catch (error) {
            console.log(error)
        }

        return client;
    }
}
