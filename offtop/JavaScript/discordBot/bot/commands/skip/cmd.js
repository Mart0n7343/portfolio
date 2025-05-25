module.exports = {
    name: 'skip',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `skip`',
    description: 'Пропускает текущий трек',

    execute(client, message, args) {
        let vcmanager = client.vcmanager.init(message, client);
        vcmanager.skip();
    }
}