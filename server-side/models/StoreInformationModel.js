const connection = require('../connections/connect');
const { DataTypes } = require("sequelize");
const PackageModel = require('./PackageModel');

const StoreInformationModel = connection.define('StoreInformation', {
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    storeName: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    storeOwnFname: {
        type: DataTypes.STRING(225),
        allowNull: true,
    },
    storeOwnLname: {
        type: DataTypes.STRING(225),
        allowNull: true,
    },
    storeOwnAddress: {
        type: DataTypes.STRING(225),
        allowNull: true
    },
    storeOwnEmail: {
        type: DataTypes.STRING(225),
        allowNull: false,
        unique:true
    },
    storeOwnPassword: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    storeOwnPhone: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique:true
    },
    storeOwnTaxId: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    storeRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 31
    },
    storeActiveStatus:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});
StoreInformationModel.belongsTo(PackageModel, { foreignKey: 'Package_packageId' });
StoreInformationModel.sync({ alter: true });
module.exports = StoreInformationModel;