const db = require('../db-config');


module.exports = {
    findAll: (req, res, next) => {
        let sql = 'SELECT * FROM tbl_Ban';
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
