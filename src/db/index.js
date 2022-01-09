const fs = require('fs');
const path = require('path')

function loadDatabase(){
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8'));
}

function writeDatabase(obj, type){
  let database = loadDatabase();

  database[type].push(obj)

   fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(database), (err) => {
    if (err){
      throw new Error('Write error: ' + err);
    }
  })
}

module.exports = {
  writeDatabase,
  loadDatabase
};
