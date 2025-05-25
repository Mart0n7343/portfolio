const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'list',
    async execute(args, message, channel, client) {
        let page;
        let audioFiles = fs.readdirSync('../bot/audio1').filter(file => file.endsWith('.mp3'));

        //custom
        if (args[0] === 'custom') {
            args.shift();
            audioFiles = fs.readdirSync('../bot/audio2').filter(file => file.endsWith('.mp3'));
        }

        //if no page provided
        if (args.length < 1) {
            page = 1
        } else {
            page = args[0];
        }

        //if isn't Number
        if (parseInt(page) == NaN || parseInt(page) <= 0) {
            client.functions.sendStrVar('INVALID_ARG', args[0])
            return;
        }

        let pageLength = 20;
        let pageNumber = Math.ceil(audioFiles.length / pageLength);

        //if no page
        if (parseInt(page) > pageNumber) {
            client.functions.sendStrVar('VC_LIST_NO_PAGE', pageNumber)
            return;
        }


        let pages = new Discord.Collection();

        //creating multiple pages
        for (let num = 0; num < pageNumber; num++) {
            let pageArray = [];
            for (let i = 0; i < pageLength; i++) {
                if (audioFiles.length > 0) pageArray.push(audioFiles.shift())
            }
            pages.set(num, pageArray)
            delete pageArray;
        }

        let msg = await message.channel.send('Loading...')
        sendPage(page, msg)
        
        function sendPage(page, msg) {

            //getting the current page
            let pageArray = pages.get(+page - 1)
            let fields = [];
            for (let key in pageArray) {
                fields.push({ name: +(+key + 1) + +(+page - 1) * pageLength, value: pageArray[key] })
            }

            let embedMsg = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`**Page ${page} / ${pageNumber}**`)
                .setAuthor('йбгдма', 'https://media.discordapp.net/attachments/850313227157372950/860924385103970304/8ebb0770ad1e4097.jpg?width=532&height=676', 
                    'https://discord.com/api/oauth2/authorize?client_id=850312763624783872&permissions=8&scope=bot')
                .setTimestamp()
                .setFooter(`Page ${page} / ${pageNumber}`, 'https://cdn.discordapp.com/emojis/723767670029156392.png?v=1')
                .addFields(fields);

            const emojiPrev = '⬅️';
            const emojiNext = '➡️';
            const emojiExit = '❌';

            msg.edit(embedMsg)
            msg.react(emojiPrev).then(() => msg.react(emojiNext)).then(() => msg.react(emojiExit));
            const filter = (reaction, user) => {
                return [emojiPrev, emojiNext, emojiExit].includes(reaction.emoji.name) && user.id === message.author.id
            }
            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    reaction.users.remove(message.author.id)
                    
                    if (reaction.emoji.name === emojiPrev && page != 1) {
                        page--;
                        sendPage(page, msg)
                    }
                    if (reaction.emoji.name === emojiNext && page != pageNumber) {
                        page++;
                        sendPage(page, msg)
                    }
                    if (reaction.emoji.name === emojiExit) {
                        msg.delete();
                        return;
                    }
                }).catch(() => {
                    msg.delete();
                    return;
                })
        }
    }
}