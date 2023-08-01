var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var dbConn = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;
    const sql = "'SELECT * FROM admin WHERE username = ?' AND password = ?";
    const userValue = `${username}`;
    const passValue = `${password}`;
    dbConn.query(sql, [userValue, passValue] , (err, results) =>{
        if (err){
            console.error("Error");
            return res.status(500).json({error: 'Internal server error'});
        }
        console.log(results);
        res.redirect('adminHome', {results});
        })
        
    });
    


module.exports = router;