const connection = require('../connections/connect');
const { DataTypes } = require('sequelize');
const StoreInformationModel = require('./StoreInformationModel');

const UserStoreModel = connection.define('UserStore', {
    userStoreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userStoreName: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    userStorePassword: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    userStoreImagePath: {
        type: DataTypes.STRING(225),
        allowNull: true
    },
    userStoreRole: {
        type: DataTypes.STRING(225),
        allowNull: false
    }
});

UserStoreModel.belongsTo(StoreInformationModel, { foreignKey: 'StoreInformation_storeId' });

UserStoreModel.sync({ alter: true });
module.exports = UserStoreModel;