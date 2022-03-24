const file = require("../bl.json");
const fs = require("fs");
module.exports = {
    name: 'getbl',
    description: 'get blacklist',
    aliases: [],
    async execute(Client, message, args, Discord) {
        
        const { ownerIDs } = require ('../config.json');
        if(!ownerIDs.includes(message.author.id)) return 
        
        //get all user in the blacklist
        if(file.blacklist.length === 0){
            return message.channel.send('There is no user in the blacklist.');
        } else {   
            let msg = `Blacklisted users :\n\n${file.blacklist.map(u => `UserId: ${u.id}  Reason: ${u.reason} Date: ${u.date}  By: ${u.by}`).join('\n')}`
            if(msg.length < 1500){
                message.channel.send(msg);

            } else {
               message.channel.send('There is too much users in the blacklist.');
            }
        
           
        }


    }
}
