
module.exports = {
    execute(client, message) {

        //fetcher
        require('./fetcher.js').execute(client, message);

        const randomNum = Math.floor(Math.random() * 11)
        const randomTime = Math.floor(Math.random() * 36e5);

        switch (randomNum) {
            //merged images
            case 1: 
                require('../core/send_merged_images.js').execute(client, message, randomTime);
                break;
            
            //regular att
            case 2:
                require('./send_att.js').execute(client, message, randomTime);
                break;
            
            //join
            case 3: 
                require('./join.js').execute(client, message, randomTime);
                break;
            
        }

    }

}