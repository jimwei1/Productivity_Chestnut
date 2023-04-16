const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../util/db');

class Class extends Model { }

Class.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'class',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Class.sync();

module.exports = Class;
