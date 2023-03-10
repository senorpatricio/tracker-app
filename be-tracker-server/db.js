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
    todo_body TEXT,
    todo_user_id TEXT,
    todo_completed BOOLEAN,
    todo_duedate TEXT) WITHOUT ROWID;`


  let sql_users = `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    user_email TEXT
  ) WITHOUT ROWID;`

      
  theDB.run(sql_todos, [], (err) => {
    if (err) {
      throw "Error creating table todos";         
    }      
  });
  
  theDB.run(sql_users, [], (err) => {
    if (err) {
      throw "Error creating table users";         
    }      
  });

});


let dbObj = { 
  theDB  
};

module.exports = dbObj;