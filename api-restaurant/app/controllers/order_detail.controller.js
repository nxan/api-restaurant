const db = require('../db-config');
const util = require('util')

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT BH_tbd_BanHangChiTiet.*, tbl_MonAn.TenMon, tbl_MonAn.DonGiaBan FROM BH_tbd_BanHangChiTiet JOIN tbl_MonAn on tbl_MonAn.MaMon = BH_tbd_BanHangChiTiet.MaMon;';
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

}   