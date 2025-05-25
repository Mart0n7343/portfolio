const fs = require('fs');

module.exports = class {

    static FILE_PATH = './resources/guildData/';

    client;
    guild;
    filePath;
    message;

    constructor(client, message) {
        this.client = client;
        this.guild = message.guild;
        this.filePath = client.fetcher.FILE_PATH + message.guildId + '/fetched.json';
        this.message = message;
    }

    execute() {
        if(this.message.author.bot) return;
        let collection = this.getAllAttachments(this.message);
        if(collection.length == 0) return;
        for(let data of collection) {
            let type = this.defineType(data);
            if(!this.client.fetcher.ALLOWED_TYPES.includes(type)) continue;
            if(!fs.existsSync(this.filePath)) this.createDataFile(this.filePath);
            if(this.isSaved(type, data, this.filePath)) continue;
            this.save(type, data, this.filePath);
            this.client.log(__filename, `Saved one ${type} to ${this.guild.id}/${this.guild.name}: ${data}`);
        }
    }


    getAllAttachments(message) {
        let collection = [];
        if(message.attachments.first()) {
            message.attachments.forEach(a => {
                collection.push(a.url);
            });
        }
        let content = message.content + ' ';
        while(true) {
            let urlIndex = content.indexOf('https://');
            if(urlIndex == -1) break;
            let endIndex = content.indexOf(' ', urlIndex);

            collection.push(content.slice(urlIndex, endIndex + 1));
            content = content.slice(endIndex + 1);
        }
        return collection;
    }

    defineType(url) {
        if(url.includes('?width')) {
            url = url.slice(0, url.indexOf('?width'));
        }
        url = url.trim();
        if(url.endsWith('.gif')) return 'gif';
        if(url.startsWith('https://tenor.com/view/')) return 'gif';
        if(url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image';
        if(url.endsWith('.mp4')) return 'video';
        return null;
    }

    createDataFile(filePath) {
        let fileContent = class {
            image = [];
            gif = [];
            video = [];
        }
        fs.mkdirSync(this.client.fetcher.FILE_PATH + this.message.guildId)
        fs.writeFileSync(filePath, JSON.stringify(new fileContent));
    }

    isSaved(type, data, filePath) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))[type].includes(data);
    }

    save(type, data, filePath) {
        let dataObj = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        dataObj[type].push(data);
        while(dataObj[type].length > this.client.fetcher.TYPES_LENGTH[type]) {
            dataObj[type].shift();
        }
        fs.writeFileSync(filePath, JSON.stringify(dataObj));
    }

    static getSize(guildID, type) {
        return JSON.parse(fs.readFileSync(this.FILE_PATH + guildID + '/fetched.json', 'utf-8'))[type].length;
    }

    static ALLOWED_TYPES = [
        'image',
        'gif',
        'video'
    ]

    static TYPES_LENGTH = {
        image: 199,
        gif: 99,
        video: 49
    }
}
