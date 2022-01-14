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

function confirmed(homework_url) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env')
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });
    console.log(homework_url.match(/\d+$/g));
    let result = connection.query(`SELECT from_id FROM Answer WHERE homework_id =${+homework_url.match(/\d+$/g)[0]} AND status=1;`);

    connection.dispose()
    return result;
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

    if (result.length && result[0].status !== null && result[0].status !== 1) {
        return true;
    }
    return !result.length;
}

function checkIsAccepted(homework_id) {
    const MySQL = require("sync-mysql");
    const env = require('../../core/env');
    const connection = new MySQL({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    });

    let result = connection.query(`select * FROM Answer WHERE homework_id=${homework_id} AND status=1`);
    connection.dispose()

    return result;
}



module.exports = {
    isHomework,
    get_replaced_message_id,
    checkIsUnique,
    checkIsAccepted,
    confirmed
}