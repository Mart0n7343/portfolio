const fs = require('fs')

module.exports = {
    name:'np',
    execute(args, message, channel, client) {

        if (client.vc.np === 0) {
            client.functions.sendStr('VC_NP_EMPTY');
            return;
        }

        client.functions.sendStrVar('VC_NP', client.vc.np)
    }
}