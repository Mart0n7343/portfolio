module.exports = {
    name: 'eval',
    execute(args, message, client) {

        //if no arg
        if (args.length < 1) {
            client.functions.sendStrVar('NOT_ENOUGH_ARGS', '');
            return;

        }

        try {
            eval(args.join(' '))
            client.functions.send('<:white_check_mark:857539078076760075>');
        } catch (error) {
            console.log(error)
            client.functions.send(`\`\`\`${error}\`\`\``);
        }
    }
}