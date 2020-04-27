'use strict';


var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'avSearch',
    connectionLimit : 10,
    acquireTimeout:1000

})

function toDb(columnName, tokenId) {
console.log("insert")
    try {
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!

        connection.query('INSERT IGNORE INTO avDomains (' + columnName + ') VALUES (?) ', [tokenId], function (err) {
            connection.release();

            if (err) {
                //console.log("error in db insert")
                if (err.code != "ER_DUP_ENTRY") { console.log(err.code) }
             //   connection.end();
            }

        }
        )
   
    })

    }
    finally {
        //   console.log("end");

     //   connection.end();
    }
}

 //toDb("000","dd")


exports.toDb = toDb
