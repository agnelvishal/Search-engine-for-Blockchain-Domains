'use strict';




function toDb(columnName, tokenId) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'avSearch'
    })
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

function fromDb(columnName) {
    return new Promise( ( resolve, reject ) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'avSearch'
    })
    try {

        connection.connect()
        connection.query('select (' + columnName + ') from avDomains  ', function (err,result) {
          //console.log(result) 
            
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
exports.toDb = toDb
exports.fromDb = fromDb

