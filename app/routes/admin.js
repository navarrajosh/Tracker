var express = require('express');
var router = express.Router();
var dbConn = require('../config/database');



router.get('/', (req, res) => {
  const search = req.query.q;
  const filter = req.query.selectedOption;
  if (!search){
    return res.status(400).json({error: 'Missing search term'});
  }
  if(filter == "assettag"){
const sql = `SELECT * FROM assets WHERE ?? = ?`;
    const searchvalue = `${search}`;
    const filtervalue = `${filter}`;
    console.log(`${search}`);
    console.log(`${filter}`);

    dbConn.query(sql,[filtervalue, searchvalue], (err, results) =>{
      if (err){
        console.error("Error");
        return res.status(500).json({error: 'Internal server error'});
      }
      console.log(results);
      res.render('assetresults', {assets:results});
    })
  }else if(filter == "eid" || filter == "username"){
    const sql = `SELECT * FROM users WHERE ?? = ?`;
    const searchvalue = `${search}`;
    const filtervalue = `${filter}`;
    console.log(`${search}`);
    console.log(`${filter}`);

    dbConn.query(sql,[filtervalue, searchvalue], (err, results2) =>{
      if (err){
        console.error("Error");
        return res.status(500).json({error: 'Internal server error'});
      }
      res.render('userresults', {users:results2});
    })
  }
  }) 

module.exports = router;
