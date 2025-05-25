module.exports = {
    name: 'merge',
    description: '\nСклеивает два или более изображения',
	syntax:'\n**Syntax**: `+merge [attachments]`',
	devPermsRequired: false,
	displayHelpMenu: true,
    async execute(client, message, args) {

        if (message.attachments.first()) {
            for (let att of message.attachments) {
                args.push(att.url);
            }
        }

        if (args.length == 0) {
            args.push(client.imageManipulator.getRandomImg(message.guild.id));
            args.push(client.imageManipulator.getRandomImg(message.guild.id));
            if (Math.floor(Math.random() * 2) == 0) {
                args.push(client.imageManipulator.getRandomImg(message.guild.id));
            }
        }
        if (args.length == 1) {
            args.push(client.imageManipulator.getRandomImg(message.guild.id));
        }
        let mainImg = args.shift();

        let imageManipulator = new client.imageManipulator(client, mainImg, args, null);
        const msg = await imageManipulator.execute(message.channel);
        message.channel.send(msg);
    }
}