const db = require('../db-config');
const util = require('util')


module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT * FROM tbl_Nhom';
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
        let sql = "INSERT INTO tbl_Nhom VALUES ";
        sql += util.format("(N'%s', '%s')",
            data.TenNhom, true);
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
}   