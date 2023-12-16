const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const ProductModel = connection.define('Product', {
    productId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productBarcode: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    productName: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    productSalePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    productCostPrice:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    productImagePath: {
        type: DataTypes.STRING(225),
        allowNull: true,
    },
    productType: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "ทั่วไป"
    },
});
ProductModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' })

ProductModel.sync({ alter: true });
module.exports = ProductModel;