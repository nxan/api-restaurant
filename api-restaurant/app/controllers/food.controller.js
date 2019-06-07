const db = require('../db-config');
const util = require('util')

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT tbl_MonAn.*, tbl_Nhom.TenNhom FROM tbl_MonAn JOIN tbl_Nhom on tbl_MonAn.IDNhom = tbl_Nhom.IDNhom';
        let query = db.query(sql)
            .then(results => {
                console.log(results);
                res.status(200).json(results);
            })
            .catch(err => {
                next(err);
            });
    },

    findByGroup: (req, res, next) => {
        var group = req.params.group;
        let sql = "SELECT * FROM tbl_MonAn WHERE IDNhom = " + group;
        console.log(sql);
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
        let sql = "INSERT INTO tbl_MonAn VALUES ";
        sql += util.format("(N'%s', %d, '%s', %d, %d)",
            data.TenMon, data.IDNhom, true, data.DonVi, data.DonGiaBan);
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
        var sql = "UPDATE tbl_MonAn SET ";
        sql += "TenMon = '" + data.TenNhom + "',";
        sql += " IDNhom = " + data.IDNhom + ",";
        sql += " HienThi = " + data.HienThi + ",";
        sql += " DonVi = " + data.DonVi + ",";
        sql += " DonGiaBan = " + data.DonGiaBan;
        sql += " WHERE MaMon = " + data.MaMon;
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