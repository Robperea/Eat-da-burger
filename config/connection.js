const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "burger_db"
});

connection.connect(function(err){
  if(err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as " + connection.threadId);
});

module.exports = connection; 