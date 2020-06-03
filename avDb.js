'use strict';
const details = require('./details.js');
const connectionD = details.connectionD


function toDb(columnName, tokenId) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(connectionD)
    try {

        connection.connect()
        connection.query('INSERT IGNORE INTO avDomains (' + columnName + ') VALUES ? ', [tokenId], function (err) {
            if (err) {
                //console.log("error in db insert")
                if (err.code != "ER_DUP_ENTRY") { console.log(err) }
            }
        }
        )
    }
    finally {
        //   console.log("end");
        connection.end();
    }
}

function toDbUpdate(updateColumnName, values, whereColumnName, whereC) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(connectionD)
    try {

        connection.connect()
        let sql = 'UPDATE avDomains SET ' + updateColumnName + ' = ? where ' + whereColumnName + ' = ?'
        //   console.log(updateColumnName, values, whereC);

        connection.query(sql, [values, whereC], function (err) {
            if (err) {
                //console.log("error in db insert")
                if (err.code != "ER_DUP_ENTRY") { console.log(err) }
            }
        }
        )
    }
    finally {
        //   console.log("end");
        connection.end();
    }
}

function fromDb(columnName, columnName2, bool) {
    return new Promise((resolve, reject) => {
        var mysql = require('mysql');
        var connection = mysql.createConnection(connectionD)
        try {
            let isNull;
            if (bool) {
                isNull = " is NULL"
            }
            else {
                isNull = " is not NULL"

            }
            let sql = `select ` + columnName + `  from avDomains where ` + columnName + ` is not null and ` + columnName2 + isNull;
            // console.log(sql);

            connection.connect()
            connection.query(sql, function (err, result) {
                // console.log(result)
                if (err) {
                    //console.log("error in db insert")
                    console.log(err)
                }
                resolve(result);
            }
            )
        }
        finally {
            //   console.log("end");
            connection.end();
        }
    })
}


function fromDbAll() {
    return new Promise((resolve, reject) => {
        var mysql = require('mysql');
        var connection = mysql.createConnection(connectionD)
        try {

            let sql = `select *  from avDomains order by defaultPopularity desc; `;
            // console.log(sql);

            connection.connect()
            connection.query(sql, function (err, result) {
                // console.log(result)
                if (err) {
                    //console.log("error in db insert")
                    console.log(err)
                }
                resolve(result);
            }
            )
        }
        finally {
            //   console.log("end");
            connection.end();
        }
    })
}

//toDb("000","dd")
//fromDb("tokenId")
// toDbUpdate("cryptoDomain","s","88539541537393697097623643676480575968407953971710600344101980240828304263242")

exports.toDb = toDb
exports.fromDb = fromDb
exports.fromDbAll = fromDbAll
exports.toDbUpdate = toDbUpdate

