module.exports = { 
    name: 'kazik',
    devPermsRequired: false,
    displayHelpMenu: true,
    syntax: '**Syntax**: `kazik`',
    description: 'КАЗИНО',
    
    async execute(client, interaction) {
        await interaction.reply('\`' + this.slot() + ' ' + this.slot() + ' ' + this.slot() + '\`');
    },

    slot() {
        let chance = Math.floor(Math.random() * 100);
        if (chance >= 0 && chance <= 25) {
            return '🍋';
        } else if(chance <= 50) {
            return '🍇';
        } else if(chance <= 75) {
            return 'bar';
        } else {
            return '7️⃣';
        }
    }
}