const Discord = require('discord.js');
module.exports = class {

    static name = 'guildMemberAdd';

    static async execute(client, member) {
        if(member.bot) return;
        if(member.guild.id != '704582721711898686') return;
        member.send({
            files: [{
                attachment: './resources/welcome/welcome.wav',
                name: 'qq.wav',
                description: 'qq'
            }]
        })
    }
}
