const mssql = require('mssql');
const Sequelize = require('sequelize');


const db = new mssql.ConnectionPool({
    user: "nxan",
    password: "Nguyenxuanan1811",
    server: "nxan.database.windows.net",
    database: "Restaurant",
    port: 1433,
    encrypt: true 
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("Mssql connected...")
});

const dbSequelize = new Sequelize('Restaurant', 'nxan', 'Nguyenxuanan1811', {
    dialect: 'mssql',
    host: 'nxan.database.windows.net',
    port: 1433,
    timestamps: false,
    dialectOptions: { options: { encrypt: true } }
});

module.exports = db;
module.exports = dbSequelize;