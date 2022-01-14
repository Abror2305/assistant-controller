function isHomework(message_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env')

    // Create connection
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`SELECT id FROM homework WHERE message_id=${message_id}`);

    // End connection
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

    let result = connection.query(`SELECT * FROM Answer WHERE homework_id=${homework_id} AND from_id="${from_id}"`);

    connection.dispose()

    return result[0];
}
function isAnswered(from_id, homework_id) {
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

    if (result.length && result[0].status !== null && result[0].status !== 1) {
        return true;
    }
    return !result.length;
}

function checkIsAccepted(from_id, homework_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env');
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`select * FROM Answer WHERE from_id= ${from_id} AND homework_id=${homework_id} AND status=1`);
    connection.dispose()

    return result;
}

function getCurrentId(table_name){
    const MySQL = require("sync-mysql");
    const env = require('../../core/env');
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`SELECT MAX(id) FROM ${table_name};`);
    connection.dispose()

    return result[0]['id'] ?? 1;
}

module.exports = {
    isHomework,
    get_replaced_message_id,
    isAnswered,
    checkIsAccepted,
    getCurrentId
}