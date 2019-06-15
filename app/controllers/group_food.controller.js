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

    update: (req, res, next) => {
        var data = req.body;
        var sql = "UPDATE tbl_Nhom SET ";
        sql += "TenNhom = N'" + data.TenNhom + "',";
        sql += " HienThi = " + data.HienThi;
        sql += " WHERE IDNhom = " + data.IDNhom;
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

    deleteGroup: (req, res, next) => {
        var groupId = req.params.groupId;
        var sql = "DELETE FROM tbl_Nhom";
        sql += " WHERE IDNhom = " + groupId;
        console.log(sql);
        db.query(sql)
            .then(results => {
                res.status(201);
                res.json({ message: 'Delete success!' });
            })
            .catch(err => {
                next(err);
            });
    },
}   