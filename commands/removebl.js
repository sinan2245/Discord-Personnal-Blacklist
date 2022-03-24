const file = require("../bl.json");
const fs = require("fs");
module.exports = {
    name: 'removebl',
    description: 'remove user to blacklist',
    aliases: ['rm','remove'],
    async execute(Client, message, args, Discord) {
        const { ownerIDs } = require('../config.json');
        if(!ownerIDs.includes(message.author.id)) return message.channel.send("You are not the owner of this bot!")
        /**
         * @optional {string} reason - Reason for blacklisting the user.
         * @required {string} user - User to blacklist.
         * @description Adds a user to the blacklist.
         */
        const file = require('../bl.json');
        const fs = require('fs')
        let user = args[0];







        //fetch the user to check if is a valid user
        let userfetch = await Client.users.fetch(user).catch(err => {
            return message.channel.send('Please provide a valid user.');
        }) 
        

        
        if(user == userfetch.id){
            
        if(!file.blacklist.find(u => u.id === userfetch.id)){
            return message.channel.send('This user is not blacklisted.');
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle("Blacklist")
            .setDescription(`${userfetch.tag} has been removed from the blacklist by ${message.author.tag}\n\nBlacklist reason: ${file.blacklist.find(u => u.id === userfetch.id).reason}`)
            .setFooter(`Blacklist removed by ${message.author.tag}`)
            .setTimestamp()
            //remove the user from the blacklist
            file.blacklist.splice(file.blacklist.findIndex(u => u.id === userfetch.id), 1);
            fs.writeFile('./bl.json', JSON.stringify(file), (err) => {
                if (err) console.log(err);
            });
            return message.channel.send({
                embeds: [embed]
            });
        }
    }








    }
}
