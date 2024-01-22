/*
    @Refresh
*/
const express = require('express');
const authen = require('./authen');
const decodeStoreId = require('../middleware/decodeStoreId');
const UserModel = require('../models/UserModel');
const StoreModel = require('../models/StoreModel');
const app = express();
const jwt = require('jsonwebtoken');

app.get("/api/v1/refresh",authen.isLogedin ,async (req, res) => {
    try {
        const storeId = decodeStoreId(req);
        const user = await UserModel.findAll({
            where: {
                store_id: storeId
            }
            ,attributes:['user_id','user_role','user_fname','user_lname','user_image']
        });

        const store = await StoreModel.findAll({
            where: {
                store_id: storeId
            },
            attributes: ['store_id','store_name', 'store_address', 'store_phone', 'store_taxid', 'store_remaining', 'store_active']
        });

        const refreshToken = jwt.sign({
            store: store,
            user: user
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });

        if (!storeId) {
            return res.status(401).send({
                success: false,
            });
        }

        res.status(200).send({
            success: true,
            refreshToken: refreshToken
        });
    }
    catch (err) {
        console.log("Err", err);
    }
});

module.exports = app;