const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');

const PackageModel = connection.define('tb_packages', {
    package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    package_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    package_name: {
        type: DataTypes.STRING(225),
        allowNull: false,
    }
});

PackageModel.sync({ alter: true });
module.exports = PackageModel;