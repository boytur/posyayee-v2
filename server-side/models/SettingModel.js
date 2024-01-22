const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreModel = require('./StoreModel');

const SettingModel = connection.define('tb_settings', {
    sett_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sett_outstock: {
        type: DataTypes.INTEGER,
        allowNull: null,
        defaultValue: 5
    },
    sett_sound:{
        type: DataTypes.BOOLEAN,
        allowNull:null,
        defaultValue:true
    },
    sett_navbar:{
        type: DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:true
    }
});
SettingModel.belongsTo(StoreModel, { foreignKey: 'store_id' });
SettingModel.sync({ alter: true });
module.exports = SettingModel;