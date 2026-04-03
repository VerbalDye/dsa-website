const Sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PW)

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    logging: true
});

console.log(sequelize);

module.exports = sequelize;