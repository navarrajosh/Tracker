var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost', // e.g., 'localhost'
    user: 'admin',
    password: '123456789',
    database: 'trackerdb'
  });
  

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected to database');
	}
});

function executeQuery(query,callback){
  connection.query(query,(err,results)=>{
    if(err){
      console.error('Error tae')
      return callback(err,null);
    }
    callback(null,results);
  })
}

module.exports = connection;


