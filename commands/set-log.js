const file = require("../bl.json");
const fs = require("fs");
module.exports = {
    name: 'set-log',
    description: 'Set log channel',
    aliases: [],
    async execute(Client, message, args, Discord) {
        const { ownerIDs } = require('../config.json');
        if(!ownerIDs.includes(message.author.id)) return 
        /**
         * @optional {string} reason - Reason for blacklisting the user.
         * @required {string} user - User to blacklist.
         * @description Adds a user to the blacklist.
         */
        const file = require('../config.json');
        const fs = require('fs')
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send('Please provide a channel.');
        
        //add the channel to the config file
        file.logChannel = channel.id;
        fs.writeFile('./config.json', JSON.stringify(file), (err) => {
            if (err) console.log(err);
        });
        return message.channel.send(`Log channel set to ${channel.name}`);
        







     




    }
}
