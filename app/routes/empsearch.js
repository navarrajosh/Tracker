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
const sql = `SELECT e.eid, u.username, a.assettag, e.startdate, e.enddate, e.borrowstatus FROM trackerdb.empassets e
                            JOIN assets a ON  a.assettag=e.assettag
                            JOIN users u ON  e.eid=u.eid
                            WHERE e.?? = ?`;
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
      res.render('results', {assets:results});
    })
   }else if(filter == "eid" || filter == "username"){
            const sql = `SELECT u.eid, u.username, a.assettag, e.borrowstatus, e.startdate, e.enddate FROM trackerdb.empassets e
                                        JOIN assets a ON  a.assettag=e.assettag
                                        JOIN users u ON  e.eid=u.eid
                                        WHERE u.?? = ?`;
            const searchvalue = `${search}`;
            const filtervalue = `${filter}`;
            console.log(`${search}`);
            console.log(`${filter}`);

    dbConn.query(sql,[filtervalue, searchvalue], (err, results2) =>{
      if (err){
        console.error("Error");
        return res.status(500).json({error: 'Internal server error'});
      }
      res.render('results2', {users:results2});
    })
  }
   }) 

module.exports = router;
