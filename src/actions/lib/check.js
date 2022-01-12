
function isHomework(mesage_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env')
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`SELECT * FROM Homework WHERE message_id=${mesage_id}`);

    connection.dispose()

    return !!result.length;
}

function get_replaced_message_id(from_id, homework_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env')
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`SELECT replaced_message_id, first_name, last_name, user_name FROM Answer WHERE homework_id=${homework_id} AND from_id="${from_id}"`);

    connection.dispose()

    return {
        from: {
            first_name: result
        }
    };
}
function checkIsUnique(from_id, homework_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env')
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`Select status FROM Answer WHERE from_id= ${from_id} AND homework_id=${homework_id}`);
    connection.dispose()

    if (result.length && result[0].status !== null) {
        return true;
    }
    else return !result.length;
}

module.exports = {
    isHomework,
    get_replaced_message_id,
    checkIsUnique
}