const { loadImage , createCanvas} = require('canvas');
const fs = require('fs');
const Discord = require('discord.js');
const sizeOf = require('image-size');
const https = require('https');

module.exports = {
    execute(client, message, time, args = []) {

        let atts = [];

        if (args.length > 0) {
            atts = args;
        } else {

            const guildFile = `../bot/attachmentArrays/${message.guild.id}.json`
            const file = JSON.parse(fs.readFileSync(guildFile, 'utf-8'));
            if (file.attachmentsArray.length == 0) return;

            let j = file.attachmentsArray.length / 2;
            for (let i = 0; i < (time % 3) + 2; i++) {
                while (true) {
                    let att = (file.attachmentsArray[Math.floor(Math.random() * file.attachmentsArray.length)]);
                    if (att.includes('.jpg') || att.includes('.png')) {
                        atts.push(att);
                        break;
                    }
                    j--;
                    if (j == 0) return;
                }
            }
            let sendTime = new Date().getTime() + time;
            sendTime = new Date(sendTime);
            client.log(__filename, `Expected to send merged images at ${sendTime.getHours()}:${sendTime.getMinutes()}:${sendTime.getSeconds()}`);
        }

        class File {

            constructor(index) {
                this.index = index;
                this.path = `./core/temp_files/me${this.index}.${atts[index].includes('.jpg') ? 'jpg' : 'png'}`
            }

            async addFile() {
                https.get(atts[this.index], (response) => response.pipe(fs.createWriteStream(this.path)))
                this.width = await sizeOf(this.path).width;
                this.height = await sizeOf(this.path).height;

            }

            index;
            width;
            height;
            path;
        }

        setTimeout(async () => {

            let files = [];
            for (let i = 0; i < atts.length ; i++) {
                let img = new File(i);
                await img.addFile();
                files.push(img);
            }

            const canvas = createCanvas(parseInt(files[0].width), parseInt(files[0].height));;
            let context = canvas.getContext('2d');

            for (let file of files) {
                let img = await loadImage(file.path);
                if (file.index == 0) {
                    context.drawImage(img, 0, 0, file.width, file.height);
                } else {
                    let x = Math.floor(Math.random() * files[0].width);
                    let y = Math.floor(Math.random() * files[0].height);
                    context.drawImage(img, x, y, 
                        Math.floor(Math.random() * (file.width / (Math.random() * 2))), 
                        Math.floor(Math.random() * (file.height / (Math.random() * 2)))
                        )
                }
            }

            message.channel.send(new Discord.MessageAttachment(canvas.toBuffer(), 'merged_images.png'));
            client.log(__filename, `Merged images sent in ${message.channel.id}/${message.channel.name}`);

            for (let file of files) {
                fs.unlinkSync(file.path);
            }
        }, 
        time);
    }
}