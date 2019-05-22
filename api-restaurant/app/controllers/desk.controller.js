const db = require('../db-config');


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

}   
