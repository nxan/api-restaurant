const db = require('../db-config');
<<<<<<< HEAD
const util = require('util')
=======

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = date + ' ' + time;
>>>>>>> 42cb50f4bb0790f03684eb962e9a8b3838029275

module.exports = {
    findAll: (req, res, next) => {
        let sql = "SELECT * FROM tbl_Ban";
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

    findByPlace: (req, res, next) => {
        var place = req.params.place;
        let sql = "SELECT * FROM tbl_Ban WHERE Khu = " + place;
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
        let sql = "INSERT INTO tbl_Ban VALUES ";
        sql += util.format("(N'%s', '%s', %d, '%d', N'%s')",
            data.TenBan, false, data.Khu, 0, 'Trống');
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

    updateDeskFull: (req, res, next) => {
        var data = req.body;
        var deskId = req.params.deskId;
        var sql = "UPDATE tbl_Ban SET ";
        sql += "HienThi = " + 1 + ", TongMon = " + data.TongMon + ", GIOVAO = '" + data.GIOVAO + "'"
        sql += " WHERE MaBan = " + deskId;
        console.log(sql);
        
        db.query(sql)
            .then(results => {
                res.status(201);
                res.json( {message: 'Update success!'} );
            })
            .catch(err => {
                next(err);
            });
    },

    updateDeskEmpty: (req, res, next) => {
        var data = req.body;
        var deskId = req.params.deskId;
        var sql = "UPDATE tbl_Ban SET ";
        sql += "HienThi = " + 0 + ", TongMon = " + 0 + ", GIOVAO = '" + "Trống" + "'"
        sql += " WHERE MaBan = " + deskId;
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
