const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Position = sequelize.define('Position', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    }
});

const Member = sequelize.define('Member', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Schedule = sequelize.define('Schedule', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Работает', 'Не работает']]
        }
    }
});


Position.hasMany(Member);
Member.belongsTo(Position);

Position.hasMany(Schedule);
Schedule.belongsTo(Position);

module.exports = { Position, Member, Schedule };
