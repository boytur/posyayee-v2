const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const SoldHistorieModel = connection.define('SoldHistorie', {
    soldId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    soldAmountToday: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
SoldHistorieModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });

SoldHistorieModel.sync({ alter: true });
module.exports = SoldHistorieModel;