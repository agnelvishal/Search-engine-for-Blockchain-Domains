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

  const outLinksCount = Number(JSON.parse(reqBody).outLinksCount)
  const charCount = Number(JSON.parse(reqBody).charCount)
  const imgCount = Number(JSON.parse(reqBody).imgCount)
  if (outLinksCount == charCount == imgCount) {
    let sql = "SELECT * FROM avDomains order by defaultPopularity desc limit " + pageNo * noPerPage + "," + noPerPage;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send({ results });
    });
  }
  else {
    const orderBy = `(${charCount}*charCount)/100+(${imgCount}*imgCount*10)+(${outLinksCount}+outLinksCount*10)+if(domainTitle="", -2000,0)+if(ethRedirectAddress is null, -100,100) +if(whoIs is null, -50,50)`
    console.log(orderBy);
    
    let sql = "SELECT * FROM avDomains order by " + orderBy + " desc limit " + pageNo * noPerPage + "," + noPerPage;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send({ results });
    });
  }

});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});