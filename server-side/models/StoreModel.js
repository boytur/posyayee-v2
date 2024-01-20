const connection = require('../connections/connect');
const { DataTypes } = require("sequelize");
const PackageModel = require('./PackageModel');

const StoreModel = connection.define('tb_stores', {
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    store_name: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    store_address: {
        type: DataTypes.STRING(225),
        allowNull: true
    },
    store_phone: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique:true
    },
    store_taxid: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    store_remaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 31
    },
    store_active:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});
StoreModel.belongsTo(PackageModel, { foreignKey: 'package_id' });
StoreModel.sync({ alter: true });
module.exports = StoreModel;