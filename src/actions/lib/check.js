const { loadDatabase } = require('../../db');
let homeworks = loadDatabase()['homeworks'];

function isHomework(message_id){

    return homeworks.find(homework => homework.message_id === message_id);
}

module.exports = {
    isHomework,
}