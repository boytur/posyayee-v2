const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');
const CreditModel = connection.define('tb_credit', {
    credit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    credit_fname: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    credit_lname: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    credit_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    credit_phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

CreditModel.belongsTo(StoreModel, { foreignKey: 'store_id' });
CreditModel.sync({ alter: true });
module.exports = CreditModel;