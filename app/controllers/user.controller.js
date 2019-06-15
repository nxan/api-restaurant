const db = require('../db-config');
const util = require('util');
const bcrypt = require('bcryptjs');

module.exports = {
    create: async (req, res, next) => {
        var data = req.body
        const salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(data.password, salt);
        let sql = "INSERT INTO tbl_User VALUES ";
        sql += util.format("('%s', '%s', N'%s')",
            data.email, hashPassword, data.name);
        db.query(sql, [data])
            .then(results => {
                console.log(data);
                res.status(201);
                res.json({ message: 'Insert success!' });
            })
            .catch(err => {
                next(err);
            });
    },

    findEmail: (req, res, next) => {
        var email = req.params.email;
        let sql = "SELECT * FROM tbl_User WHERE email = '" + email + "'";
        console.log(sql)
        let query = db.query(sql)
            .then(results => {
                console.log(results)
                if(results.rowsAffected[0] === 1) {
                    res.status(400).json(results);
                } else {                    
                    res.status(200).json(results);                    
                }
            })
            .catch(err => {
                next(err);
            });
    },    

    auth: async (req, res, next) => {
        var data = req.body;
        let sql = "SELECT * FROM tbl_User WHERE email = '" + data.email + "'";
        console.log(sql)
        db.query(sql)
            .then(results => {
                console.log(results)
                if(results.rowsAffected[0] === 1) {    
                    bcrypt.compare(req.body.password, results.recordset[0]['password'], function (err, result) {                
                        if(result == true) {
                            res.status(200).json({msg: "Login success"});
                        } else {
                            res.status(400).json({msg: "Invalid password"});
                        }
                    });
                } else {                    
                    res.status(400).json({msg: "Invalid email"});                    
                }
            })
            .catch(err => {
                next(err);
            });
    },
    
    
}