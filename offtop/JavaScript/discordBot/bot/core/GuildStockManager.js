const fs = require('fs');

module.exports = class {

    static FILE_PATH = '../bot/resources/guildData/';

    client;
    filepath;
    content;

    constructor(client, guild) {
        this.client = client;
        this.filepath = exports.FILE_PATH + guild.id + '/stock.json';
    }

    getContent() {
        this.content = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'));
    }

    saveContent() {
        fs.writeFileSync(this.filepath, JSON.stringify(content));
    }

    add(key, value) {
        this.content[key] = value;
    }

    get(key) {
        return this.content[key];
    }

    delete(key) {
        delete this.content[key];
    }

    has(key) {
        return this.content.hasOwnProperty(key);
    }

    clean() {
        fs.unlinkSync(this.filepath);
    }

    checkFile() {
        return fs.existsSync(this.filepath);
    }
}