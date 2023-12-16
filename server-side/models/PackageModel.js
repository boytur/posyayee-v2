const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');

const PackageModel = connection.define('Package', {
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    packagePrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    packageName: {
        type: DataTypes.STRING(225),
        allowNull: false,
    }
});

PackageModel.sync({ alter: true });
module.exports = PackageModel;