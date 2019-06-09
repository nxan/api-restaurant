const db = require('../db-config');
const util = require('util')

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT BH_tbd_BanHangChiTiet.*, tbl_MonAn.TenMon, tbl_MonAn.DonGiaBan, BH_tbd_BanHangLyLich.MaBan FROM BH_tbd_BanHangChiTiet JOIN tbl_MonAn on tbl_MonAn.MaMon = BH_tbd_BanHangChiTiet.MaMon JOIN BH_tbd_BanHangLyLich on BH_tbd_BanHangLyLich.SOHOADON = BH_tbd_BanHangChiTiet.SOHOADON';
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
        let sql = "INSERT INTO BH_tbd_BanHangChiTiet VALUES ";
        sql += util.format("('%s', %d, %d, %d)", 
                data.SOHOADON, data.MaMon, data.SoLuongTra, data.SoLuong);
        db.query(sql, [data])
            .then(results => {
                console.log(data);
                res.status(201);
                res.json( {message: 'Insert success!'} );
            })
            .catch(err => {
                next(err);
            });
    },

    getOrderDesk: (req, res, next) => {
        var deskId = req.params.deskId;
        let sql = 'SELECT BH_tbd_BanHangChiTiet.*, tbl_MonAn.TenMon, tbl_MonAn.DonGiaBan FROM BH_tbd_BanHangChiTiet JOIN tbl_MonAn on tbl_MonAn.MaMon = BH_tbd_BanHangChiTiet.MaMon ';
        sql += 'WHERE SOHOADON IN (SELECT SOHOADON FROM BH_tbd_BanHangLyLich WHERE KETTHUC = 0 AND MaBan = ' + deskId + ')';
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

    updateFoodByOrderId: (req, res, next) => {
        var data = req.body;
        var sql = "UPDATE BH_tbd_BanHangChiTiet SET ";
        sql += "SoLuong = " + data.SoLuong;
        sql += " WHERE MaMon = " + data.MaMon + " AND SOHOADON = " + data.SOHOADON;
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

    deleteFood: (req, res, next) => {
        var orderId = req.params.orderId;
        var foodId = req.params.foodId;
        var sql = "DELETE FROM BH_tbd_BanHangChiTiet";
        sql += " WHERE SOHOADON = " + orderId + " AND MaMon = " + foodId;
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