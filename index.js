const Discord = require('discord.js');
const mongoose = require('mongoose');
const {
    BOT_TOKEN,
    PREFIX,
} = require('./config.json');
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        parse: [],
        repliedUser: false
    }
});
const prefix = PREFIX;




Client.commands = new Discord.Collection();
Client.events = new Discord.Collection();
Client.slashCmds = new Discord.Collection();
module.exports = Client;

['cmd_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(Client, Discord);
})
const package = require('./functions')
Client.on('guildMemberAdd', member => {
    
    let reason = package.isBlacklisted(member.id).reason
    let date = package.isBlacklisted(member.id).date
    let by = package.isBlacklisted(member.id).by
    if (reason) {
        //ban the user if he is in the blacklist
        member.ban({
            reason: `${reason}`
        }).catch(err => {
            console.log(err)
        })
        member.send(`You have been banned from the server. Reason: ${reason} Date: ${date} By: ${by}`).catch(err => console.log(err))
        const log = require('./config.json').logChannel
        const logChannel = Client.channels.cache.get(log)
        if (logChannel) {
            logChannel.send(`:warning: ${member.user.tag} is blacklisted for ${reason} and has been banned`).catch(err => console.log(err))
        } else {
            console.log(`Log channel not found.`)
        }

    }

})

Client.on('messageCreate', async message => {
    let reason = package.isBlacklisted(message.author.id).reason
    let date = package.isBlacklisted(message.author.id).date
    let by = package.isBlacklisted(message.author.id).by
    if (reason) {
        let msg = await message.channel.send(`:warning: **WARNING**\nYou're blacklisted from this server. Reason: ${reason} Date: ${date} By: ${by}\nYou will be banned soon`).catch("Unable to send message to user");

        const wait = require('util').promisify(setTimeout);
        await wait(10000);
        msg.delete().catch(err => {
            console.log(err)
        })
        
        let user = await message.guild.members.fetch(message.author.id);
        user.ban({
            reason: `${reason}`
        }).catch(err => {
            console.log(err)
        })
        user.send(`You have been banned from the server because you're blacklisted. Reason: ${reason} Date: ${date} By: ${by}`).catch("Unable to send message to user");

        const log = require('./config.json').logChannel
        const logChannel = Client.channels.cache.get(log)
        if (logChannel) {
            logChannel.send(`:warning: ${message.author.tag} is blacklisted for ${reason} and has been banned`).catch("Unable to send message to log channel");
        } else {
            console.log(`Log channel not found.`)
        }

    }

})



Client.login(BOT_TOKEN)