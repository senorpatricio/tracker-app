let sqlite3 = require('sqlite3').verbose();
const dbname = "Todos.db";

let theDB = null;
 
const prepareDB = (dbname) => {
  return new sqlite3.Database(`./database/${dbname}`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);  
} 

theDB = prepareDB(dbname);
theDB.serialize(() => {
  let sql_todos = `CREATE TABLE IF NOT EXISTS todos (
    todo_id INTEGER PRIMARY KEY, 
    todo_title TEXT, 
    todo_duedate TEXT, 
    todo_body TEXT) WITHOUT ROWID;`;
      
  theDB.run(sql_todos, [], (err) => {
    if (err) {
      throw "Error creating table todos";         
    }      
  });

});


let dbObj = { 
  theDB  
};

module.exports = dbObj;