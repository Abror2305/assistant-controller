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

module.exports = {
    isHomework,
}