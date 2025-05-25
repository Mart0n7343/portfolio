const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const path = require('path');
const fs = require('fs');

const client = new Client({
    intents: [ 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildWebhooks
    ],
    partials: [Partials.Channel]
});

const CORE_PATH = './core/';
const EVENT_PATH = './core/events/';
const DATA_PATH = './resources/data/';

client.cfg = require(DATA_PATH + './cfg.json');
client.blacklist = require(DATA_PATH + 'blacklist.json');

client.logger = require(CORE_PATH + 'Logger.js');
client.vcmanager = require(CORE_PATH + 'VCManager.js');
client.fetcher = require(CORE_PATH + 'Fetcher.js');
client.commandManager = require(CORE_PATH + 'CommandManager.js');
client.generalFunctions = require(CORE_PATH + 'GeneralFunctions.js');
client.imageManipulator = require(CORE_PATH + 'ImageManipulator.js');
client.guildStock = require(CORE_PATH + 'GuildStockManager.js');
client.functions = require(CORE_PATH + 'GeneralFunctions.js');

client.log = new client.logger(client).execute;
client.commandManager.initSlash(client);

client.once('ready', () => {
    //client.generateInvite(["ADMINISTRATOR"]).then(link => {
    //    console.log(link);
        client.log(__filename, '\n------------------------------------ready------------------------------------');
    //});
    client.user.setPresence({
        activities: [{ name: client.cfg.activity, type: ActivityType.Watching }]
      });
});

for (let eventFile of fs.readdirSync(EVENT_PATH).filter(filter => filter.endsWith('.js'))) {
    const event = require(EVENT_PATH + eventFile);
    client.on(event.name, async (...args) => event.execute(client, ...args));
}

/*process.on('uncaughtException', function (err) {
    client.log(__filename, err);
}); */

client.login(client.cfg.bot_token);
