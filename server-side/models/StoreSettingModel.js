const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const StoreSettingModel = connection.define('StoreSetting', {
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
    soundOnSale:{
        type: DataTypes.BOOLEAN,
        allowNull:null,
        defaultValue:true
    },
    navbar:{
        type: DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:true
    }
});
StoreSettingModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });
StoreSettingModel.sync({ alter: true });
module.exports = StoreSettingModel;