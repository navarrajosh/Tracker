var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var dbConn = require('../config/database');

/* GET home page. */
router.get('/', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;
    const sql = `SELECT * FROM admin WHERE username = ?`;
    const userValue = `${username}`;
    const passValue = `${password}`;
    dbConn.query(sql, [userValue] , (err, results) =>{
        if (err){
            console.error("Error");
            return res.status(500).json({error: 'Internal server error'});
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.error(err);
              return res.status(500).render('error', { message: 'Error comparing passwords' });
            }
      
            if (!isMatch) {
              return res.status(401).render('error', { message: 'Invalid password' });
            }
            console.log(results);
            res.render('adminHome', {results});
          });
        });
        
    });






module.exports = router;