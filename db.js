'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const details = require('./details.js');
const connectionD = details.connectionD
var connection = mysql.createConnection(connectionD)

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/api/all', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  var reqBody
  Object.keys(req.body).forEach(function (key) {
    reqBody = key
  });
  const pageNo = Number(JSON.parse(reqBody).pageNo)
  const noPerPage = 20 
  let sql = "SELECT * FROM avDomains order by defaultPopularity desc limit "+ pageNo*noPerPage + "," + noPerPage ;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send({ results });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});