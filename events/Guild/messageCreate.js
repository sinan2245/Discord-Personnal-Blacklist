const { PREFIX } = require('../../config.json');

module.exports = (Discord, Client, message) => {
    const prefix = PREFIX;
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix) || message.channel.type == 'DM' ) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = Client.commands.get(command)

    if(cmd) cmd.execute(Client, message, args, Discord);
}
