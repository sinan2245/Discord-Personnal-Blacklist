const fs = require('fs');
const path = require('path');
const file = require('./bl.json')
function isBlacklisted(user) {
    if(file.blacklist.find(u => u.id === user)){
        reason = file.blacklist.find(u => u.id === user).reason
        date = file.blacklist.find(u => u.id === user).date
        by = file.blacklist.find(u => u.id === user).by
        return {
            reason: reason,
            date: date,
            by: by
        }
    } else {
        return false;
    }

    }

    module.exports = {
        isBlacklisted
    }


