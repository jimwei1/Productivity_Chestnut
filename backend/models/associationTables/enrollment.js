const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../../util/db');

class Enrollment extends Model { }

Enrollment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'classes', key: 'id'},
    },
}, {
    sequelize,
    underscored: true,
    modelName: 'enrollment',
    timestamps: false,
});

module.exports = Enrollment;