const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../util/db');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Must be an email address.'
            }
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Must be a number.'
            },
            len: {
                args: [10, 10],
                msg: 'Must be 10 digits.'
            },
        },
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
    modelName: 'user',
});

User.sync();

module.exports = User;