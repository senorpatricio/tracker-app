const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const normalizePort = require("./normalizeport");

const PORT = normalizePort(process.env.PORT || 5000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cors());

let dbObj = require('./db');
let theDB = dbObj.theDB;

app.get('/', (req, res) => {
  console.log("Received a GET request");
  res.json({message: "Hello there"});
});

app.get('/todos', (req, res) => {
  console.log("Received a GET /todos request");
  theDB.all("SELECT * FROM todos", (err, results) => {
    if (err) {
      res.send(err.message);
    }
    console.log(results);
    res.json(results);
  })
  
});

app.post('/todos', (req, res) => {
  console.log("Received a POST /todos request.");
  
  let todo_id = req.body.todo_id; 
  let todo_title = req.body.todo_title;
  let todo_body = req.body.todo_body;
  let todo_duedate = req.body.todo_duedate;
  let todo_completed = req.body.todo_completed;
  let todo_user_id = req.body.todo_user_id;
  
  console.log(`Data: { todo_id: ${todo_id}, todo_title: ${todo_title}, todo_body: ${todo_body}, todo_completed: ${todo_completed}, todo_duedate: ${todo_duedate}, todo_user_id: ${todo_user_id} }`);
  
  
  theDB.run('INSERT INTO todos (todo_id, todo_title, todo_body, todo_user_id, todo_completed, todo_duedate) VALUES(?, ?, ?, ?, ?, ?)', [todo_id, todo_title, todo_body, todo_user_id, todo_completed, todo_duedate], (err => {
    if (err) {
      console.log('POST ',  err.message);
      res.send(err.message);
    }
    else {
      theDB.all('SELECT * FROM todos', [], (err, results) => {
        if (err) {
          console.log('SELECT ', err.message);
          res.send(err.message);            
        }
        else {
          res.json(results);
        }
      })
    }
  }))  
   
  // TODO:
  app.get('/todos/:todo_id', (req, res) => {
    const todo_id = req.params.todo_id;
    let sql = 'SELECT todo_title, todo_body FROM todos WHERE todo_id = ?';
    theDB.run(sql, [todo_id], (err => {
      if (err) {
        console.log('GET ', err.message);
        res.send(err.message);
      }
      else {
        theDB.all(sql, [todo_id], (err, results) => {
          if(err) {
            console.log('GET ELSE ',err.message);
            res.send(err.message);          
          }
          else {
            res.json(results);
          }
        })
      }
    }))
  });
  
});

app.put('/todos/:todo_id', (req, res) => {
  // Extract todo from req and update DB with it using its ID and body
  // Send back an OK/Fail message
  console.log("Receiving a PUT /todos/:todo_id request");
  const todo_id = req.params.todo_id;
  const todo_title = req.body.todo_title;
  const todo_body  = req.body.todo_body; 
  const todo_duedate  = req.body.todo_duedate; 
  const todo_completed = req.body.todo_completed;
  const todo_user_id = req.body.todo_user_id

  console.log(`Data: { todo_id: ${todo_id}, todo_title: ${todo_title}, todo_body: ${todo_body}, todo_completed: ${todo_completed}, todo_duedate: ${todo_duedate} }`);
  
  let sql = 'UPDATE todos SET todo_title = ?, todo_body = ?, todo_user_id = ?, todo_completed = ?, todo_duedate = ? WHERE todo_id = ?';
  theDB.run(sql, [todo_title, todo_body, todo_user_id, todo_completed, todo_duedate, todo_id], (err => {
    if (err) {
      console.log('PUT ', err.message);
      res.send(err.message);
    }
    else {
      theDB.all('SELECT * FROM todos', [], (err, results) => {
        if(err) {
          console.log('PUT SELECT ', err.message);
          res.send(err.message);          
        }
        else {
          res.json(results);
        }
      })
    }
  }))

});

app.delete('/todos/:todo_id', (req, res) => {
  // Find todo in DB by id and delete it
  // Send back an OK/Fail message
  console.log("Received a DELETE /todos/:todo_id request");
  const id = req.params.todo_id;
  let sql = 'DELETE FROM todos WHERE todo_id = ?';
  theDB.run(sql, [id], (err) => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    }
    else {
      theDB.all('SELECT * FROM todos', [], (err, results) => {
        if (err) {
          console.log(err.message);
          res.send(err.message);
        }
        else {
          res.json(results);
        }
      })
    }
  })
  
});


// USERS interactions
app.get('/users', (req, res) => {
  console.log("Received a GET /users request");
  theDB.all("SELECT * FROM users", (err, results) => {
    if (err) {
      res.send(err.message);
    }
    console.log(results);
    res.json(results);
  })
  
});

app.post('/users', (req, res) => {
  console.log("Received a POST /users request.");
  
  let user_id = req.body.user_id; 
  let username = req.body.username;
  let user_email = req.body.user_email;
  
  console.log(`Data: { user_id: ${user_id}, username: ${username}, user_email: ${user_email}}`);
  
  
  theDB.run('INSERT OR IGNORE INTO users (user_id, username, user_email) VALUES(?, ?, ?)', [user_id, username, user_email], (err => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    }
    else {
      theDB.all('SELECT * FROM users', [], (err, results) => {
        if (err) {
          console.log(err.message);
          res.send(err.message);            
        }
        else {
          res.json(results);
        }
      })
    }
  }))  
  
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}...`);
});