const fs = require('fs');

module.exports = {
    name: 'addfile',
    execute(args, message, client) {

        //if no args
        if (args.length < 2) {
            client.functions.sendStrVar('NOT_ENOUGH_ARGS', '');
            return;
        }
        
        const fileType = args[0];
        const filePath = args[1];
        let fileUrl;

        //if attachment
        if (fileType === 'attachment') {

            //if no attachment
            if (!message.attachments.first()) {
                client.functions.sendStr('EDIT_NO_ATT');
                return;
            }

            fileUrl = message.attachments.first().url

        //if url
        } else if (fileType === 'url') {

            if (args.length < 3) {
                client.functions.sendStrVar('NOT_ENOUGH_ARGS', '')
                return;
            }

            fileUrl = args[3];
        
        //if nothing
        } else {
            client.functions.sendStrVar('INVALID_ARG', fileType)
            return;
        }

        try {
            request.get(fileUrl)
                .on('error', console.error)
                .pipe(fs.createWriteStream(filePath))

        } catch (error) {
            message.channel.send(`${error}`);
            return;
        }

        client.functions.send('<:white_check_mark:857539078076760075>')
    }
}