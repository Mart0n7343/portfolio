const { createCanvas, loadImage } = require('canvas');
const Discord = require('discord.js');
const fs = require('fs');
const request = require('request')

module.exports = {
    name: 'edit',
    description: '\nДобавляет текст на изображение',
    syntax: '**Syntax:** +edit [текст]',
    devPermsRequired: false,
    displayHelpMenu: true,
    async execute(client, message, args) {

        if (args.length < 1) {
            client.functions.sendStr('NO_ARG');
            return;
        }
        let fileUrl;
        let height;
        let width;
        if (message.attachments.first()) {
            fileUrl = message.attachments.first().url;
            height = message.attachments.first().height
            width = message.attachments.first().width
        } else if (args.length > 1) {
            fileUrl = args[0]
            args.shift();
            height = fileUrl.slice(fileUrl.indexOf('height=')).replace('height=', '')
            width = fileUrl.slice(fileUrl.indexOf('width='), fileUrl.indexOf('&height')).replace('width=', '')
            client.log(__filename, height + ' ' + width);
        } else {
            client.functions.sendStr('EDIT_NO_ATT');
            return;
        }


        let text = args.join(' ');
        if (fileUrl.includes('png')) {
            request.get(fileUrl)
                .on('error', console.error)
                .pipe(fs.createWriteStream('./image.png'))
                .on('finish', () => sendAtt('.png'))

        } else if (fileUrl.includes('jpg')) {
            request.get(fileUrl)
                .on('error', console.error)
                .pipe(fs.createWriteStream('./image.jpg'))
                .on('finish', () => sendAtt('.jpg'))

        } else {
            client.functions.sendStr('INVALID_EXTENSION');
            return;
        }


        async function sendAtt(extension) {

            const canvas = createCanvas(parseInt(width), parseInt(height));;
            const context = canvas.getContext('2d');


            loadImage(`./image${extension}`)
                .then((image) => {
                    context.drawImage(image, 0, 0, width, height);

                    let applyText = () => {
                        let fontSize = height / 9;

                        do {
                            context.font = `bold ${fontSize -= 5}px impact`;
                        } while (context.measureText(text).width > width * (4 / 5));

                        return context.font;
                    }

                    context.font = applyText();
                    context.fillStyle = '#ffffff';
                    context.fillText(text, (width - context.measureText(text).width) / 2, height * (8 / 9));

                    const att = new Discord.MessageAttachment(canvas.toBuffer(), `image${extension}`);
                    message.channel.send(att)
                    fs.unlinkSync(`./image${extension}`);

                })
        }
    }
}