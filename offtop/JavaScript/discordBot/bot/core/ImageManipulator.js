const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const sizeOf = require('image-size');
const Discord = require('discord.js');
const request = require('request');

module.exports = class {

    static TEMP_PATH = './resources/temp/';

    client;
    mainImg;
    imgs = [];
    text = false;
    context;

    constructor(client, mainImg, imgs, text) {
        this.client = client;
        this.mainImg = mainImg;
        this.imgs = imgs;
        this.text = text;
    }
    

    async execute(channel) {
        await this.download(this.mainImg, this.imgs);
        let canvas = createCanvas(parseInt(this.getWidth('m')), parseInt(this.getHeight('m')));
        this.context = canvas.getContext('2d');
        await loadImage(this.client.imageManipulator.TEMP_PATH + 'im_m.jpeg')
            .then(mainImg => {
                let width = this.getWidth('m');
                let height = this.getHeight('m');
                this.context.drawImage(
                    mainImg, 
                    this.mainImg.x ?? 0, 
                    this.mainImg.y ?? 0, 
                    width, 
                    height
                    );
                if (this.text) {
                    applyText(width, height, this.text);
                };
                if (this.imgs.length > 0) {
                    for (let img of this.imgs) {
                        this.addImg(
                            this.imgs.indexOf(img), 
                            this.getWidth('m'), 
                            this.getHeight('m'));
                    }
                }
            });
        this.client.log(__filename, `Image manipulator used in ${channel.id}/${channel.name}`);
        let msg = { files: [new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'nixat.png'})]};
        this.client.functions.cleanTemp(this.client);
        return msg;
    }


    async download(mainImg, images) {
        let d = async (url, path) => {
            const file = fs.createWriteStream(path);

            await new Promise((resolve, reject) => {
                request({
                    uri: url,
                    gzip: true,
                })
                    .pipe(file)
                    .on('finish', async () => {
                        resolve();
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            })
                .catch((error) => {
                    console.log(`Something happened: ${error}`);
                });
        }

        await d(mainImg, this.client.imageManipulator.TEMP_PATH + 'im_m.jpeg');
        //https.get(mainImg, response => response.pipe(fs.createWriteStream(this.client.imageManipulator.TEMP_PATH + 'im_m.png')));
        for (let img of images) {
            await d(img, this.client.imageManipulator.TEMP_PATH + 'im_' + images.indexOf(img) + '.jpeg');
            //https.get(img, response => response.pipe(fs.createWriteStream(this.client.imageManipulator.TEMP_PATH + 'im_' + images.indexOf(img) + '.png')));
        }
        return;
    }

    getWidth(index) {
        let width = sizeOf(this.client.imageManipulator.TEMP_PATH + 'im_' + index + '.jpeg').width;
        return width;
    }

    getHeight(index) {
        let height = sizeOf(this.client.imageManipulator.TEMP_PATH + 'im_' + index + '.jpeg').height;
        return height;
    }

    applyText(width, height, text) {
        let fontSize = height / 9;
        do {
            this.context.font = `bold ${fontSize -= 5}px impact`;
        } while (context.measureText(text).width > width * (4 / 5));
        this.context.fillStyle = '#ffffff';
        this.context.fillText(text, (width - context.measureText(text).width) / 2, height * (8 / 9));
    }

    async addImg(index, width, height) {
        console.log(index)
        let img;
        try {
             img = await loadImage(this.client.imageManipulator.TEMP_PATH + "im_" + index + ".jpeg");
        } catch(err) {
            console.log(err);
            return;
        }
       
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        this.context.drawImage(
            img, x, y,
            Math.floor(Math.random() * (width / (Math.random() * 2))),
            Math.floor(Math.random() * (height / (Math.random() * 2)))
        );
    }

    static getRandomImg(guildID) {
        const fetchedPath = `./resources/guildData/${guildID}/fetched.json`;
        const templatePath = `./resources/templates.json`;
        let path;
        if (Math.floor(Math.random() * 18) === 1) {
            path = templatePath;
        } else {
            path = fetchedPath;
        }
        if (fs.existsSync(path)) {
            let fileContent = JSON.parse(fs.readFileSync(path), 'utf-8');
            if (fileContent.image.length == 0) return null;
            return fileContent.image[Math.floor(Math.random() * fileContent.image.length)];
        } else return null;

    }
}