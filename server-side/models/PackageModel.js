const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');

const PackageModel = connection.define('tb_packages', {
    pack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pack_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    pack_name: {
        type: DataTypes.STRING(225),
        allowNull: false,
    }
});

PackageModel.sync({ alter: true });
module.exports = PackageModel;