const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const StoreSettingModel = connection.define('storeSetting', {
    settingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    outOfStockValue: {
        type: DataTypes.INTEGER,
        allowNull: null,
        defaultValue: 5
    },
});
StoreSettingModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });
StoreSettingModel.sync({ alter: true });
module.exports = StoreSettingModel;