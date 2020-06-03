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
  const isGundb = Number(JSON.parse(reqBody).isGundb)

  let gunDb = ``
  if (isGundb) {
    gunDb = `where gundb is not null`
  }

  let orderBy;

  if (outLinksCount == 1 && charCount == 1 && imgCount == 1)
    orderBy = `order by defaultPopularity desc`
  else
    orderBy = `order by (${charCount}*charCount)/100+(${imgCount}*imgCount*10)+(${outLinksCount}+outLinksCount*10)+if(domainTitle="", -2000,0)+if(ethRedirectAddress is null, -100,100) +if(whoIs is null, -50,50) + manualRating desc`


  let sql = `SELECT *, substring(domainDesc,1,200)  as domainDesc2, substring(domainTitle,1,50)  as domainTitle2  FROM avDomains ${gunDb} ${orderBy} limit ${pageNo * noPerPage}, ${noPerPage}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send({ results });
  });

});


app.post('/api/search', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  var reqBody
  Object.keys(req.body).forEach(function (key) {
    reqBody = key
  });
  const pageNo = Number(JSON.parse(reqBody).pageNo)
  const noPerPage = 10

  const outLinksCount = Number(JSON.parse(reqBody).outLinksCount)
  const charCount = Number(JSON.parse(reqBody).charCount)
  const imgCount = Number(JSON.parse(reqBody).imgCount)
  const search = String(JSON.parse(reqBody).search)

  if (outLinksCount == 1 && charCount == 1 && imgCount == 1) {
    let sql = `SELECT *, substring(domainDesc,1,200)  as domainDesc2, substring(domainTitle,1,50)  as domainTitle2  FROM avDomains where (cryptoDomain like '%${search}%' or domainDesc like '%${search}%' or domainType like '%${search}%') and ipfsHash is not null order by defaultPopularity desc limit ${pageNo * noPerPage}, ${noPerPage}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send({ results });
    });
  }
  else {
    const orderBy = `(${charCount}*charCount)/100+(${imgCount}*imgCount*10)+(${outLinksCount}+outLinksCount*10)+if(domainTitle="", -2000,0)+if(ethRedirectAddress is null, -100,100) +if(whoIs is null, -50,50) + manualRating`
    // console.log(orderBy);
    let sql = ` SELECT *, substring(domainDesc,1,200)  as domainDesc2, substring(domainTitle,1,50)  as domainTitle2  FROM avDomains where (cryptoDomain like '%${search}%' or domainDesc like '%${search}%' or domainType like '%${search}%') and ipfsHash is not null order by ${orderBy} desc limit ${pageNo * noPerPage} , ${noPerPage}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send({ results });
    });
  }
});


app.get('/api/vote', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req);


  const cryptoDomain = req.query.cryptoDomain
  const vote = Number(req.query.vote)


  let sql = `UPDATE avDomains SET manualRating = manualRating + ${vote} where cryptoDomain= '${cryptoDomain}'`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send({ results });
  });


});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});