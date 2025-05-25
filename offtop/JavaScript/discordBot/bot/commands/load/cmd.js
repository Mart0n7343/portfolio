const fs = require('fs');

module.exports = {
    name: 'load',
    description: '\nОтправляет сообщение из базы данных с заданным ключом',
    syntax: '\n**Syntax**: `+load [key]`',
    devPermsRequired: false,
    displayHelpMenu: true,
    execute(client, message, args) {

        if (args.length == 0) {
            client.functions.sendStrVar('NO_ARG', this.syntax, message.channel);
            return;
        }

        let guildStock = new client.guildStock(client, message.guild);
        if (!guildStock.checkFile()) {
            client.functions.sendStr('LOAD_NO_DATA', message.channel)
            return;
        }
        guildStock.getContent();
        if (!guildStock.has(args[0])) {
            client.functions.sendStr('LOAD_INVALID_KEY', message.channel);
            return;
        }
        message.channel.send(guildStock.get(args[0]));
    }
}