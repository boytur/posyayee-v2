const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');

const SoldHistorieModel = connection.define('tb_soldhis', {
    sold_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sold_today: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
SoldHistorieModel.belongsTo(StoreModel, { foreignKey: 'store_id' });

SoldHistorieModel.sync({ alter: true });
module.exports = SoldHistorieModel;