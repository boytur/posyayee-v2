const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const SoldHistorieModel = require('./SoldHistorieModel');

const SoldDetailModel = connection.define('SoldDetail', {
    soldDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    productIdSold: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantitySold: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownSoldName: {
        type: DataTypes.STRING(225),
        allowNull: false
    }
});
SoldDetailModel.belongsTo(SoldHistorieModel, { foreignKey: 'SoldHistorie_soldId' });

SoldDetailModel.sync({ alter: true });
module.exports = SoldDetailModel;