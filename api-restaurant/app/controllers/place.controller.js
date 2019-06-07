const db = require('../db-config');
const util = require('util')

module.exports = {
    findAll: (req, res, next) => {
        let sql = "SELECT * FROM tbl_Khu";
        console.log(sql)
        let query = db.query(sql)
            .then(results => {
                console.log(results);
                res.status(200).json(results);
            })
            .catch(err => {
                next(err);
            });
    },

    create: (req, res, next) => {
        var data = req.body
        let sql = "INSERT INTO tbl_Khu VALUES ";
        sql += util.format("(N'%s')",
            data.TenKhu);
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

    update: (req, res, next) => {
        var data = req.body;
        var sql = "UPDATE tbl_Khu SET ";
        sql += "TenKhu = '" + data.TenKhu + "'" ;
        sql += " WHERE MaKhu = " + data.MaKhu;
        console.log(sql);
        db.query(sql)
            .then(results => {
                res.status(201);
                res.json({ message: 'Update success!' });
            })
            .catch(err => {
                next(err);
            });
    },
}