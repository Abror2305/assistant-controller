// const connection = require("mysql").createConnection({
//     host: "localhost",
//     user: "Abror",
//     password: "Abror2006/",
//     database: "assistant_controller"
// });
const { connection } = require("../../db")


function isHomework(mesage_id) {
        connection.query(`SELECT * FROM Homework WHERE message_id = ${mesage_id}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return result.length > 0;
            }
        });
}
isHomework(114)
module.exports = {
    isHomework,
}