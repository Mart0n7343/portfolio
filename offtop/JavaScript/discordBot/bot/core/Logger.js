const fs = require('fs');

module.exports = class {

    client;

    constructor(client) {
        this.client = client;
    }

    execute(file, string) {

        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let second = new Date().getSeconds();

        let logsFile = `../bot/resources/logs/log_${month}_${year}.txt`

		if (!(fs.existsSync(logsFile))) {
			fs.writeFileSync(logsFile, 'Welcome!');
		};

        let fileName = require('path').basename(file);

        let log = `\n[${day}_${month}_${year}] ${hour}:${minute}:${second} - ${fileName}: ${string}`;
        fs.appendFileSync(logsFile, log);
        console.log(log);
    }
}