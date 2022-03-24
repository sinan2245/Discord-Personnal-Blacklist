module.exports = {
    name: 'addbl',
    description: 'adduser to blacklist',
    aliases: ['bl','blacklist'],
    
    async execute(Client, message, args, Discord) {
        const { ownerIDs } = require ('../config.json');
        if(!ownerIDs.includes(message.author.id)) return 
        /**
         * @optional {string} reason - Reason for blacklisting the user.
         * @required {string} user - User to blacklist.
         * @description Adds a user to the blacklist.
         */
        const file = require('../bl.json');
        const fs = require('fs')
        
        let user = args[0];
        let reason = args.slice(1).join(' ');
        if (!user) return message.channel.send('Please provide a user to blacklist.');
        if (!reason) return message.channel.send('Please provide a reason for blacklisting the user.');
        if(user === message.author.id) return message.channel.send("You can't blacklist yourself!")
        if(user === Client.user.id) return message.channel.send("You can't blacklist me!")




        //fetch the user to check if is a valid user
        let userfetch = await Client.users.fetch(user).catch(err => {
            return message.channel.send('Please provide a valid user.');
        });





        //get all user id in the blacklist
        if(file.blacklist.find(u => u.id === userfetch.id)){
            return message.channel.send('This user is already blacklisted.');
        } else {
            //get the today date
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;

            file.blacklist.push({
                id: userfetch.id,
                reason: reason,
                date: today,
                by: message.author.id
            });
            fs.writeFile('./bl.json', JSON.stringify(file), (err) => {
                if (err) console.log(err);
            });
            return message.channel.send(`${userfetch.tag} has been blacklisted.`);
        }



    }
}
