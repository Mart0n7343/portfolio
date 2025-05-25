const fs = require('fs')
const request = require('request')

module.exports = {
    name:'add',
    execute(args, message, channel, client) {

        if (args.length < 1) {
            client.functions.sendStr('NO_ARG');
            return;
        }

        let fileName = args[0];
        args.shift()

        let fileUrl;
        if (message.attachments.first()) {
            fileUrl = message.attachments.first().url;
        } else if (args.length > 0) {
            fileUrl = args[0]
            args.shift();
        } else {
            client.functions.sendStr('VC_ADD_NO_ATT');
            return;
        }

        if (fileUrl.includes('mp3')) {
            request.get(fileUrl)
                .on('error', () => {
                    console.error;
                    client.functions.sendStrVar('INVALID_ARG', fileUrl)
                })
                .pipe(fs.createWriteStream(`../bot/audio2/${fileName}.mp3`))
                .on('finish', () => client.functions.sendStrVar('VC_ADD_SUCCESS', fileName))

        } else {
            client.functions.sendStr('INVALID_EXTENSION');
            return;
        }
    }
}