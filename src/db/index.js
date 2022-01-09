const fs = require('fs');

function writeDatabase(obj, type){
  let database = JSON.parse(fs.readFileSync('database.json', 'utf8'));

  database[type].push(obj)

  fs.writeFileSync('database.json', JSON.stringify(database), (err) => {
    if (err){
      throw new Error('Write error: ' + err);
    }
    console.log("Write successfuly")
  })
}

// function loadDatabase(){
//   let loadedJSON = JSON.parse(fs.readFileSync('database.json', 'utf8'));
//   database = JSON.parse(loadedJSON);
// }



module.exports = {
  writeDatabase
};
