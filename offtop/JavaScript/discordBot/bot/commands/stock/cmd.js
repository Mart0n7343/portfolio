const fs = require('fs');

module.exports = {
    name: 'stock',
    description: 'Без аргумента - Отправляет всю базу сервера в сообщении\nclean - очищает всю базу\ndelete [key] - удаляет данные по ключу',
    syntax: '**Syntax**: `+stock (clean/delete [key])`',
    devPermsRequired: false,
    displayHelpMenu: true,
    execute(client, message, args) {

        const guildFile = `./saveload/${message.guild.id}.json`
        
        //if no data
        if (!(fs.existsSync(guildFile))) {
            client.functions.sendStr('LOAD_NO_DATA', message.channel)
            return;
        }

        //if arguments
        if (args.length > 0 ) {
            if (args[0] === 'clean') {
                if (client.functions.noPermAuthor() === '123') {
                    client.functions.sendStr('NO_PERM_AUTHOR', message.channel);
                    return;
                }
                fs.unlinkSync(guildFile);
                client.functions.sendStr('DATA_CLEAN', message.channel);
                return;
            } else if (args.length > 1 || args[0] === 'delete') {
                let file = JSON.parse(fs.readFileSync(guildFile, 'utf-8'));
                delete file[args[1]];
                fs.writeFileSync(guildFile, JSON.stringify(file));
                client.functions.sendStr('DATA_DELETE', message.channel);
                return;
            } else {
                client.functions.sendStrVar('INVALID_ARG', args[0], message.channel);
                return;
            }
        }
        
        let file = JSON.parse(fs.readFileSync(guildFile, 'utf-8'));
        let msg = 'Data: \n```json\n{'
        for (let key in file) {
            msg += `\n \    "${key}\":\"${file[key]}\",`
        };
        msg = msg.slice(0, -1);
        msg +='\n}```';
        client.functions.send(msg);
    }
}