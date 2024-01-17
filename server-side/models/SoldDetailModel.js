const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const SoldHistorieModel = require('./SoldHistorieModel');

const SoldDetailModel = connection.define('tb_details', {
    detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    detail_prodid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detail_prodname: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    detail_quatity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detail_owner: {
        type: DataTypes.STRING(225),
        allowNull: false
    }
});
SoldDetailModel.belongsTo(SoldHistorieModel, { foreignKey: 'sold_id' });

SoldDetailModel.sync({ alter: true });
module.exports = SoldDetailModel;