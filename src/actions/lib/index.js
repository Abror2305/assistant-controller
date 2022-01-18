const MySQL = require("sync-mysql");
const env = require("../../core/env");
const connection = new MySQL({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

function isHomework(message_id, channel_id) {
  if (channel_id) {
    let result = connection.query(
      `SELECT * FROM homeworks WHERE message_id=${message_id} AND channel_id=${channel_id}`
    );
    return !!result.length;
  }
}

function isAnswered(from_id, homework_id) {
  let result = connection.query(
    `SELECT status FROM answers WHERE from_id=${from_id} AND homework_id=${homework_id};`
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
    `SELECT * FROM answers WHERE from_id=${from_id} AND homework_id=${homework_id} AND status=1`
  );

  return result.length ? result[0] : false;
}

function saveAnswer(ctx) {
  let check = connection.query(
    `SELECT id FROM answers WHERE from_id=${ctx["from_id"]} AND homework_id=${ctx["homework_id"]}`
  );

  if (check.length === 0) {
    connection.query(
      "INSERT INTO answers ( " +
      " username," +
      " first_name," +
      " last_name," +
      " from_id," +
      " homework_id," +
      " photo_id," +
      " replaced_message_id" +
      ' ) VALUES ( "' +
      ctx["username"] +
      '" , "' +
      ctx["first_name"] +
      '" , "' +
      ctx["last_name"] +
      '" , ' +
      ctx["from_id"] +
      " , " +
      ctx["homework_id"] +
      ' , "' +
      ctx["photo_id"] +
      '" , ' +
      ctx["replaced_message_id"] +
      " );"
    );

    return connection.query(`SELECT MAX(id) FROM answers;`)[0]["MAX(id)"];

  } else {

    connection.query(`UPDATE answers
        SET
            photo_id="${ctx["photo_id"]}",
            replaced_message_id=${ctx["replaced_message_id"]}
        WHERE
            id=${check[0]["id"]};`);
    return check[0]["id"];
  }
}

function getInfoFromID(id) {
  const result = connection.query(`SELECT * FROM answers WHERE id=${id}`);
  return result[0];
}

function changeStatus(status, id) {
  connection.query(`UPDATE answers SET status=${status} WHERE id=${id};`);
}

function getInfoAboutGroup(share_point_id) {
  let result = connection.query(`SELECT * FROM groups WHERE share_point=${share_point_id}`)
  return result[0];
}

function checkGroup(share_point_id, discussion, admin_chanel) {
  let result = connection.query(
    `SELECT share_point FROM groups WHERE share_point=${share_point_id} OR` +
    ` discussion=${discussion} OR admin_channel=${admin_chanel};`
  );
  console.log(result);
  return !result.length;
}

function addGroups(share_point_id, discussion, admin_chanel) {
  connection.query(
    `INSERT INTO groups (share_point, discussion, admin_channel)` +
    `VALUES ( ${share_point_id}, ${discussion}, ${admin_chanel});`
  );
}

function isAdmin(id) {
  let result = connection.query(
    `SELECT id FROM admins WHERE id=${id};`
  );
  return !!result.length;
}
function rmGroup(share_point){
  connection.query(`DELETE FROM groups WHERE share_point=${share_point};`)
}


function isValidGroup(share_point){
  let result = connection.query(`SELECT * FROM groups WHERE share_point=${share_point}`);

  return !!result.length;
}

module.exports = {
  isHomework,
  isAnswered,
  checkIsAccepted,
  saveAnswer,
  getInfoFromID,
  changeStatus,
  getInfoAboutGroup,
  addGroups,
  checkGroup,
  isAdmin,
  isValidGroup,
  rmGroup
};