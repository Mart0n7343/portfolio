const fs = require('fs');
const path = require('path');

module.exports = class {

    static sendStrVar(key, variable, channel) {
		let str = require('../strings.json');
		let foundPos = str[key].indexOf('$$');
		let string = str[key].replace(str[key].slice(foundPos, +foundPos + +2), variable);
		channel.send(string);
	}

	static sendStr(key, channel) {
		let str = require('../strings.json');
		channel.send(str[key]);
	}

	static send(text, channel) {
		channel.send(text);
	}

	static getFileName(fn) {
		return require('path').basename(fn);
	}

	static cleanTemp(client) {
		fs.readdir('./resources/temp', (err, files) => {
			if (err) client.log(__filename, err);
			for (const file of files) {
				fs.unlink(path.join('./resources/temp', file), err => {
					if (err) client.log(__filename, err);
				});
			}
		});
	}
}