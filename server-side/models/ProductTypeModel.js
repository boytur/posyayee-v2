const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const ProductTypeModel = connection.define('ProductType', {
    productTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productTypeName: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
})
ProductTypeModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });

ProductTypeModel.sync({ alter: true });
module.exports = ProductTypeModel;