module.exports = {
    name:'skip',
    execute(args, message, channel, client) {
        const playFile = require('./arg_play.js')
        const song = playFile.skip();
        client.functions.sendStrVar('VC_SKIP', song);
    }
}