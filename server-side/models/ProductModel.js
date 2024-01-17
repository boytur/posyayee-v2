const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');

const ProductModel = connection.define('tb_products', {
    prod_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    prod_barcode: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    prod_name: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    prod_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    prod_sale:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    prod_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    prod_image: {
        type: DataTypes.STRING(225),
        allowNull: true,
    },
    prod_type: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "ทั่วไป"
    },
    prod_exp:{
        type: DataTypes.DATE,
        allowNull: true,
    }
});
ProductModel.belongsTo(StoreModel, { foreignKey: 'store_id' })

ProductModel.sync({ alter: true });
module.exports = ProductModel;