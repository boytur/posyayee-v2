const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');

const ProductTypeModel = connection.define('tb_prodtypes', {
    pordtype_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pordtype_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
})
ProductTypeModel.belongsTo(StoreModel, { foreignKey: 'store_id' });

ProductTypeModel.sync({ alter: true });
module.exports = ProductTypeModel;