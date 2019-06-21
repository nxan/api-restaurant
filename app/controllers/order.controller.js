const db = require('../db-config');
const util = require('util')

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT BH_tbd_BanHangLyLich.*, tbl_Ban.TenBan FROM BH_tbd_BanHangLyLich JOIN tbl_Ban ON tbl_Ban.MaBan = BH_tbd_BanHangLyLich.MaBan';
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
        let sql = "INSERT INTO BH_tbd_BanHangLyLich VALUES ";
        sql += util.format("('%s', %d, %d, N'%s', N'%s', %d, N'%s', N'%s', '%s', N'%s', %d, %d, %d)",
            date, data.INHOADON, data.MaBan, data.GIOVAO, data.GIORA, null, data.TRANGTHAI, data.MaNhanVienBan, date,
            data.HostName, data.MaGiam, data.Huy, data.TongMon);        
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
        if (data) {
            if (!data.SOHOADON) throw new Error("SOHOADON no provided");
            var sql = "UPDATE BH_tbd_BanHangLyLich SET ";

            if (data.INHOADON != null) {
                sql += " INHOADON = " + data.INHOADON + ",";
                isDataProvided = true;
            }
            if (data.MaBan != null) {
                sql += " MaBan = " + data.MaBan + ",";
                isDataProvided = true;
            }
            if (data.GIORA != null) {
                sql += " GIORA = " + time + ",";
                isDataProvided = true;
            }
            if (data.KETTHUC != null) {
                sql += " KETTHUC = " + data.KETTHUC + ",";
            }
            if (data.Huy != null) {
                sql += " Huy = " + data.Huy + ",";
                isDataProvided = true;
            }
            sql = sql.slice(0, -1);
            sql += " WHERE SOHOADON = " + data.SOHOADON;
            console.log(sql);
        }
        db.query(sql)
            .then(results => {
                console.log(data);
                res.status(201);
                res.json({ message: 'Update success!' });
            })
            .catch(err => {
                next(err);
            });
    },

    placeOrder: (req, res, next) => {
        var data = req.body;
        if (data) {
            if (!data.SOHOADON) throw new Error("SOHOADON no provided");
            var sql = "UPDATE BH_tbd_BanHangLyLich SET ";
            sql += "INHOADON = " + 1 + ",";
            sql += " GIORA = '" + data.GIORA + "',";
            sql += " KETTHUC = " + 1 + ",";
            sql += " TRANGTHAI = '" + "Trống" + "'";
            sql += " WHERE SOHOADON = " + data.SOHOADON;
            console.log(sql);
        }
        db.query(sql)
            .then(results => {
                console.log(data);
                res.status(201);
                res.json({ message: 'Pay success!' });
            })
            .catch(err => {
                next(err);
            });
    },

    checkDesk: (req, res, next) => {
        var deskId = req.params.deskId;
        let sql = "SELECT SOHOADON, KETTHUC FROM BH_tbd_BanHangLyLich WHERE MaBan = " + deskId;
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

    updateQuantityFood: (req, res, next) => {
        var data = req.body;
        var sql = "UPDATE BH_tbd_BanHangLyLich SET ";
        sql += "TongMon = " + data.TongMon;
        sql += " WHERE SOHOADON = " + data.SOHOADON;
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

    countCreated: (req, res, next) => {
        let sql = 'SELECT COUNT(NGAYHOADON), NGAYHOADON FROM BH_tbd_BanHangLyLich GROUP BY NGAYHOADON';
        let query = db.query(sql)
            .then(results => {
                console.log(results);
                res.status(200).json(results);
            })
            .catch(err => {
                next(err);
            });
    },

    findOrderByDeskEnd: (req, res, next) => {
        var deskId = req.params.deskId;
        var timeEnd = req.params.timeEnd;
        let sql = "SELECT BH_tbd_BanHangLyLich.*, tbl_Ban.TenBan FROM BH_tbd_BanHangLyLich JOIN tbl_Ban ON tbl_Ban.MaBan = BH_tbd_BanHangLyLich.MaBan WHERE BH_tbd_BanHangLyLich.MaBan = " + deskId + " AND BH_tbd_BanHangLyLich.GIOVAO = '" + timeEnd + "'";
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

}   