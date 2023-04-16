const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../util/db');

class Project extends Model { }

Project.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
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
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'project',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Project.sync();

module.exports = Project;
