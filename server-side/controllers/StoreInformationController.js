const express = require('express');
const app = express();
const StoreInformationModel = require('../models/StoreInformationModel');
const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
const hashAsync = util.promisify(bcrypt.hash);

app.post('/api/store/signup-store', async (req, res) => {
    const { Package_packageId, storeName, storeOwnFname, storeOwnLname, storeOwnEmail, storeOwnPassword } = req.body;
    try {
        // Validate data
        if (!Package_packageId || !storeName || !storeOwnFname || !storeOwnLname || !storeOwnEmail || !storeOwnPassword) {
            return res.status(400).json({
                success: false,
                msg: "กรุณากรอกข้อมูลให้ครบถ้วน!"
            });
        }

        // Check for existing store
        const existingEmail = await StoreInformationModel.findAll({
            where: {
                storeOwnEmail: storeOwnEmail
            }
        });
        if (existingEmail.length !== 0) {
            return res.status(409).json({
                success: false,
                msg: "อีเมลนี้ถูกใช้แล้วค่ะ!"
            });
        }

        // Hash the password
        const hash = await hashAsync(storeOwnPassword, saltRounds);

        const newUser = {
            storeName,
            storeOwnFname,
            storeOwnLname,
            storeOwnEmail,
            storeOwnPassword: hash,
            Package_packageId
        };

        const result = await StoreInformationModel.create(newUser);
        return res.status(201).json({
            success: true,
            msg: "ลงทะเบียนร้านค้าเรียบร้อยค่ะ!",
            result
        });
    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = app;