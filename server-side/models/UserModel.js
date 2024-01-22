const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');

const UserModel = connection.define('tb_users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_fname: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    user_lname: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    user_image: {
        type: DataTypes.STRING(225),
        allowNull: true
    },
    user_role: {
        type: DataTypes.STRING(225),
        allowNull: false
    }
});

UserModel.belongsTo(StoreModel, { foreignKey: 'store_id' });

UserModel.sync({ alter: true });
module.exports = UserModel;