const fs = require('fs'); // Fs Package

module.exports = (Client, Discord) => {
    const cmd_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for(const file of cmd_files) {
        const cmd = require(`../commands/${file}`)
        if(cmd.name) {
            Client.commands.set(cmd.name, cmd);
        } else {
            continue;
        }
    }
}
