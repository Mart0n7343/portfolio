module.exports = {
    name: 'execute',
    execute(args, message, client) {
        
        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case 'client':
                    args[i] = client;
                    break;
                case 'message':
                    args[i] = message;
                    break;
            }
        }

        try {
            let file = require(`../../${args[0]}`);
            file.execute(args[1], args[2], args[3], args[4]);
            client.log(__filename, `Executed ${args[0]}`)
            client.functions.send('<:white_check_mark:857539078076760075>');
        } catch (error){
            client.functions.send(error.message);
            client.log(__filename, error.message);
            console.log(error);
        }
    }
}