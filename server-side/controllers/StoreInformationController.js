const express = require('express');
const app = express();
const StoreInformationModel = require('../models/StoreInformationModel');
const UserStoreModel = require('../models/UserStoreModel');
const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
const hashAsync = util.promisify(bcrypt.hash);
const path = require('path');

//multer for uploading files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img-avatar');
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    },
});

//จำกัดขนาไม่เกิน 1 MB
const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 } });

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


app.post('/api/store/sign-up-employee/:StoreInformation_storeId', upload.single('photo'), async (req, res) => {
    try {
        const { userStoreName, userStorePassword} = req.body;
        const { StoreInformation_storeId } = req.params;
        console.log(req.body);
        console.log(req.params);
        const fileName = req.file ? req.file.filename : null;
        console.log(fileName);

        //หาว่า StoreInformation_storeId นี้มีอยู่ในระบบไหม
        const findStoreId = await StoreInformationModel.findAll({
            where: {
                storeId: StoreInformation_storeId,
            }
        });

        if (findStoreId.length == 0) {
            return res.status(400).send({
                success: false,
                msg: "เกิดข้อผิดพลาดในระบบ ไม่สามารถเพิ่มพนักงานร้านค้าไอดีนี้ได้ค่ะ"
            });
        }

        //Validate ข้อมูล
        switch (true) {
            case !userStoreName || !userStorePassword:
                return res.status(400).send({
                    success: false,
                    msg: "กรุณาใส่ข้อมูลให้ครบถ้วนค่ะ"
                });
        }

        //หาว่าในร้านมีเจ้าของยัง ถ้ามีให้คนที่เพิ่มมาเป็นพนักงาน ถ้าไม่ให้คนที่เพิ่มเข้ามาเป็นเจ้าของ
        const findUserInStore = await UserStoreModel.findAll({
            where: {
                StoreInformation_storeId: StoreInformation_storeId,
            }
        });

        if (findStoreId.length != 0 && findUserInStore.length == 0) {
            const newUserStore = {
                userStoreName,
                userStorePassword,
                userStoreImagePath: fileName,
                userStoreRole: "onwer",
                StoreInformation_storeId: StoreInformation_storeId
            }
            const result = await UserStoreModel.create(newUserStore);
            return res.status(200).send({
                seccess: true,
                msg: "เพิ่มเจ้าของร้านเรียบร้อยค่ะ",
                result
            });
        }
        else if (findStoreId.length != 0 && findUserInStore.length != 0) {
            const newUserStore = {
                userStoreName,
                userStorePassword,
                userStoreImagePath: fileName,
                userStoreRole: "employee",
                StoreInformation_storeId: StoreInformation_storeId
            }
            const result = await UserStoreModel.create(newUserStore);
            return res.status(200).send({
                seccess: true,
                msg: "เพิ่มพนักงานเรียบร้อยค่ะ",
                result
            });
        }
    }
    catch (err) {
        console.log('Error: ', err);
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = app;