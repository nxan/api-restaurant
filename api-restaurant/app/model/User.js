const Sequelize = require('sequelize');
const dbSequelize = require('../db-config');

const User = dbSequelize.define('tbl_User', {
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = User;