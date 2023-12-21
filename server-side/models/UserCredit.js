const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');
const UserCreditModel = connection.define('UserCredit', {
    userCreditId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userCreditName: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    userCreditAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userCreditPhone:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
});
UserCreditModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });
UserCreditModel.sync({ alter: true });
module.exports = UserCreditModel;