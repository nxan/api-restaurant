const db = require('../db-config');
const util = require('util')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT * FROM BH_tbd_BanHangLyLich';
        let query = db.query(sql)
            .then(results => {
                console.log(results);
                res.status(200).json(results.recordset);
            })
            .catch(err => {
                next(err);
            });
    },

    create: (req, res, next) => {
        var data = req.body
        let sql = "INSERT INTO BH_tbd_BanHangLyLich VALUES ";
        sql += util.format("('%s', '%s', %d, %d, '%s', '%s', %d, '%s', '%s', '%s', '%s', %d, %d)", 
                data.SOHOADON, dateTime, data.INHOADON, data.MaBan, time, data.GIORA, null, data.TRANGTHAI, data.MaNhanVienBan, dateTime, 
                data.HostName, data.MaGiam, data.Huy);
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

    update: (req, res, next) => {
        var data = req.body;
        if(data) {

            if(!data.SOHOADON) throw new Error("SOHOADON no provided");
            var sql = "UPDATE BH_tbd_BanHangLyLich SET ";

            if(data.INHOADON != null) {
                sql += " INHOADON = " + data.INHOADON + ",";
                isDataProvided = true;
            }
            if(data.MaBan != null) {
                sql += " MaBan = " + data.MaBan + ",";
                isDataProvided = true;
            }
            if(data.GIORA != null) {
                sql += " GIORA = " + time + ",";
                isDataProvided = true;
            }
            if(data.KETTHUC != null) {
                sql += " KETTHUC = " + data.KETTHUC + ",";
            }
            if(data.Huy != null) {
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
                res.json( {message: 'Update success!'} );
            })
            .catch(err => {
                next(err);
            });
    }
}   