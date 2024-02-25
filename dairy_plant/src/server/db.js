const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    'dairy_plant',
    'postgres',
    'toor',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }
)