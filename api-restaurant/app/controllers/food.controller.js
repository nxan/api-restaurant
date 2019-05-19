const db = require('../db-config');

module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT tbl_MonAn.*, tbl_Nhom.TenNhom FROM tbl_MonAn JOIN tbl_Nhom on tbl_MonAn.IDNhom = tbl_Nhom.IDNhom';
        let query = db.query(sql)
            .then(results => {
                console.log(results);
                res.status(200).json(results.recordset);
            })
            .catch(err => {
                next(err);
            });
    },

}   