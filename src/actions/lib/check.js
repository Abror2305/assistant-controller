const { database } = require('../../db');

function isHomework(message_id){
    return database.homeworks.find(homework => homework.message_id === message_id);
}

module.exports = {
    isHomework,
}