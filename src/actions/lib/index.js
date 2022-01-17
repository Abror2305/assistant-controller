const MySQL = require("sync-mysql");
const env = require("../../core/env");
const group = require("../../db/group.json");
const connection = new MySQL({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

function isHomework(message_id, channel_id) {
  if (channel_id){
    let result = connection.query(
      `SELECT id FROM homework WHERE message_id=${message_id} AND channel_id=${channel_id}`
    );
    return !!result.length;
  }
  return false;
}

function getLastID(tablename) {
  let result = connection.query(`SELECT MAX(id) FROM ${tablename};`);
  return result[0]["MAX(id)"];
}

function isAnswered(from_id, homework_id) {
  let result = connection.query(
    `SELECT status FROM answer WHERE from_id=${from_id} AND homework_id=${homework_id};`
  );

  if (result.length) {
    switch (result[0].status) {
      case null:
        return "pending";
      case 1:
        return "answered";
    }
  }
  return "new";
}

function checkIsAccepted(from_id, homework_id) {
  let result = connection.query(
    `SELECT * FROM answer WHERE from_id=${from_id} AND homework_id=${homework_id} AND status=1`
  );

  return result.length ? result[0] : false;
}

function saveAnswer(ctx) {
  let check = connection.query(
    `SELECT id FROM answer WHERE from_id=${ctx['from_id']} AND homework_id=${ctx['homework_id']}`
  );

  if (check.length === 0) {
    connection.query(
      "INSERT INTO answer ( " +
        " username," +
        " first_name," +
        " last_name," +
        " from_id," +
        " homework_id," +
        " photo_id," +
        " replaced_message_id" +
        ' ) VALUES ( "' +
        ctx['username'] +
        '" , "' +
        ctx['first_name'] +
        '" , "' +
        ctx['last_name'] +
        '" , ' +
        ctx['from_id'] +
        " , " +
        ctx['homework_id'] +
        ' , "' +
        ctx['photo_id'] +
        '" , ' +
        ctx['replaced_message_id'] +
        " );"
    );

    return getLastID("answer");
  } else {
    connection.query(`UPDATE answer
        SET
            photo_id="${ctx['photo_id']}",
            replaced_message_id=${ctx['replaced_message_id']}
        WHERE
            id=${check[0]["id"]};`);
    return check[0]["id"];
  }
}

function getInfoFromID(id) {
  const result = connection.query(`SELECT * FROM answer WHERE id=${id}`);
  return result[0];
}

function changeStatus(status, id) {
  connection.query(`UPDATE answer SET status=${status} WHERE id=${id};`);
}

function getInfoAboutGroup(share_point_id){
  let group = require('../../db/group.json');
  return group[`${share_point_id}`];
}

module.exports = {
  isHomework,
  isAnswered,
  checkIsAccepted,
  saveAnswer,
  getInfoFromID,
  changeStatus,
  getLastID,
  getInfoAboutGroup
};
