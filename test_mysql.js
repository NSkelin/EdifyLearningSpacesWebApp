var mysql = require('mysql');

/**
 * Creates a connection to the database.
 * @returns {array} con - connection details
 */
function createConnection() {
    var con = mysql.createConnection({
        connectionLimit : 100,
        host     : '54.244.61.15',
        port     :  3306,
        host: "localhost",
        user: "user",
        password: "Password1@",
        database: "edify"
    });
    return con
}

/**
 * Connects to the database.
 * @param {array} con - connection details.
 * @returns {Promise} returns void.
 */
function connect(con) {
    return new Promise((resolve, reject) => {
        con.connect(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
* Sends a query to the database to get the users info.
* @param {string} email.
* @param {string} password.
* @returns {Promise} returns "ok".
*/
function getUser(email, password) {
    return new Promise ((resolve,reject) => {
        var con = createConnection();
        connect(con)
        .then((resolved) => {

            con.query("SELECT * FROM user WHERE email = '"+email+"' AND password = '"+password+"'", function (error, row) {
                if (error){
                    reject(err);
                } else if (row.length > 0) {
                    var user = {id: row[0].user_id, fname: row[0].first_name, lname: row[0].last_name, email: row[0].email, admin: row[0].is_admin}
                    resolve(user);
                } else {
                    reject('Email not found!');
                }      
            });
            
        }).catch ((error) => {
            reject(error);
        });
    });
    con.end();
}

function addUser() {
    return new Promise ((resolve, reject) => {
        var con = net.createConnection();
        connect(con)
        .then((resolved) => {
            con.query("INSERT INTO user(first_name, last_name, password, email, location, is_admin) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", 
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve('ok');
                }
            });

        }).catch((error) => {
            reject(error);
        });
    });
}

/**
* Sends a query to the database to get the users info.
* @param {string} email.
* @param {string} password.
* @returns {Promise} returns "ok".
*/
function getUser(email, password) {
    return new Promise ((resolve,reject) => {
        var con = createConnection()
        connect(con)
        .then((resolved) => {

            con.query("SELECT * FROM user WHERE email = '"+email+"' AND password = '"+password+"'", function (err, row) {
                if (err){
                    reject(err)
                }
                if (row.length > 0) {
                    var user = {id: row[0].user_id, fname: row[0].first_name, lname: row[0].last_name, email: row[0].email, admin: row[0].is_admin}
                    resolve(user);
                } else {
                    reject('Email not found!')
                }      
            })
            con.end();
        }), (err) => {
            reject(err)
        }
    })    
}

/**
 * Sends a query to the database to update first and last name.
 * @param {string} fname - First name.
 * @param {string} lname - Last name.
 * @returns {Promise} returns "ok".
 */
function changeName(fname, lname) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
        .then((resolved) => {

            con.query("UPDATE user SET first_name ='" + fname + "', last_name ='" + lname + "' WHERE user_id = 3;", 
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve('ok');
                }
            });

        }).catch ((error) => {
            reject(error);
        });
    });
    con.end();
}

/**
 * Sends a query to the database to update email.
 * @param {string} email.
 * @returns {Promise} returns "ok".
 */
function changeEmail(email) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
        .then((resolved) => {

            con.query("UPDATE user SET email ='" + email + "' WHERE user_id = 3;",
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve('ok');
                }
            });

        }).catch((error) => {
            reject(error);
        });
    });
    con.end();
}

/**
 * Sends a query to the database to update password.
 * @param {string} password.
 * @returns {Promise} returns "ok".
 */
function changePassword(password) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
        .then((resolved) => {

            con.query("UPDATE user SET password ='" + password + "' WHERE user_id = 3;",
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve('ok');
                }
            });

        }).catch((error) => {
            reject(error);
        });
    });
    con.end();
}

function addLicense(file, type, notes, user_id) {
    return new Promise((resolve, reject) => {

        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.query("INSERT INTO license(file, type, user_notes, frn_user_id) values ('"+file+"', '" + type + "', '" + notes + "', " + user_id +")",
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve('ok');
                }
            });
                
        }).catch((error) => {
            reject(error);
        });
    });
    con.end();
}

function getLicense(license_id) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
        .then((resolved) => {

            con.query("select * from license where license_id = "+ license_id + ";",
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });

        }).catch((error) => {
            reject(error);
        });
    });
    con.end();
}


function retrievelicenses(user_id) {
    status_data = {}
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
                
            con.query("SELECT * FROM license WHERE frn_user_id = " + user_id + ";", function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    for(i = 0; i < result.length; i++) {
                        status_data[result[i].type] = [result[i].status] 
                    }
                    resolve(status_data);
                }
                
            })
        }).catch((error) => {
            reject(error);
        });
    });
    con.end();
}


module.exports = {
    getUser,
    changeName,
    changeEmail,
    changePassword,
    retrievelicenses,
    getLicense,
    addLicense
}

