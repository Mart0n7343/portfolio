const Discord = require( 'discord.js' );
const fs = require( 'fs' );
const path = require('path');
const dotenv = require('dotenv');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

module.exports = class {

    client;
    commands;

    constructor( client ) {
        this.client = client;
    }

    static async initSlash(client) {

        this.slashCommands = [
            new SlashCommandBuilder()
                .setName('kazik')
                .setDescription('ОКУП 100х')
        ].map(command => command.toJSON());

        const rest = new REST({ version: '10' }).setToken(client.cfg.bot_token);
        await rest.put(Routes.applicationCommands(client.cfg.application_id), { body: this.slashCommands });
    };

    static async executeSlash(client, interaction) {
        const command = require('../../bot/commands/' + interaction.commandName + '/cmd.js');
        command.execute(client, interaction);
    }

    execute( message ) {
        if ( message.content.startsWith( this.client.cfg.prefix ) && message.content.length >= 2 && !message.author.bot ) {
            let args = message.content.slice( this.client.cfg.prefix.length ).trim().split( / +/ );
            let command = args.shift().toLowerCase();
            this.initCommands();
            if ( !this.commandExists( command, message.channel ) ) {
                return;
            }
            this.checkChannelBlacklisted( command, message.channel.id );
            let cmd = this.commands.get( command );
            if ( cmd.devPermsRequired ) {
                if ( !this.checkDevPerms( message ) ) return;
            }
            try {
                cmd.execute( this.client, message, args );
                this.client.log( __filename, `${message.author.id}/${message.author.tag} used '${command}' in ${message.guild.id}/${message.guild.name}` );
            } catch ( error ) {
                console.log( error );
            }
        }

    }

    initCommands() {
        this.commands = new Discord.Collection();
        const dirs = fs.readdirSync( '../bot/commands' );
        for ( let dir of dirs ) {
            const cmd = require( `../../bot/commands/${dir}/cmd.js` );
            this.commands.set( cmd.name, cmd );
        }
    }

    commandExists( command, channel ) {
        if ( !this.commands.has( command ) ) {
            this.client.functions.sendStrVar( 'INVALID_CMD', command, channel );
            return false;
        }
        return true;
    }

    checkDevPerms( message ) {
        if ( this.client.cfg.devs.includes( message.author.id ) ) return true;
        this.sendStr( 'NO_PERMISSION' );
        return false;
    }

    checkChannelBlacklisted( command, channel ) {
        if ( command == 'blacklist' ) return false;
        if ( this.client.blacklist.channel.includes( channel ) ) {
            this.sendStr( 'CHANNEL_BLACKLISTED' );
            return true;
        }
        return false;
    }
}
