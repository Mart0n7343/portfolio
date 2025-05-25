const { InteractionType } = require('discord.js');
module.exports = class {

    static name = 'interactionCreate';

    static async execute(client, interaction) {
        switch(interaction.type) {
            case InteractionType.ApplicationCommand: {
                client.commandManager.executeSlash(client, interaction);
                break;  
            }
        }
    }
}