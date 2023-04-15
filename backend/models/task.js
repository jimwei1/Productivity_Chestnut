const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../util/db');

class Task extends Model { }

Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Must be a number.'
            },
            min: {
                args: 1,
                msg: 'Must be greater than 0.'
            },
            max: {
                args: 5,
                msg: 'Must be less than 6.'
            },
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: 'Must be a date.'
            },
            isAfter: {
                args: new Date().toString(),
                msg: 'Must be in the future.'
            },
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    }
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'task',
    });

    Task.sync();

module.exports = Task;