const db = require('../db-config');

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

}   