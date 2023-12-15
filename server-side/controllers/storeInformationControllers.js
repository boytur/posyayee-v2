const express = require('express');
const app = express();
const StoreInformationModel = require('../models/StoreInformationModel');
const UserStoreModel = require('../models/UserStoreModel');

const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
const hashAsync = util.promisify(bcrypt.hash);
const path = require('path');
const jwt = require('jsonwebtoken');

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

//จำกัดขนาดไม่เกิน 1 MB
const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 } });

/*sign up a new store
  สมัครร้านค้าใหม่
*/

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

/* sign up a new user in store 
   เพิ่มคนขายในร้าน
*/

app.post('/api/store/signup-employee/:StoreInformation_storeId', upload.single('photo'), async (req, res) => {
    try {
        const { userStoreName, userStorePassword} = req.body;
        const { StoreInformation_storeId } = req.params;
        const fileName = req.file ? req.file.filename : null;

        //หาว่า StoreInformation_storeId นี้มีอยู่ในระบบไหม
        const findStoreId = await StoreInformationModel.findAll({
            where: {
                storeId: StoreInformation_storeId,
            }
        });

        //ถ้าไม่มีส่ง error ออกไป
        if (findStoreId.length == 0) {
            return res.status(400).send({
                success: false,
                msg: "เกิดข้อผิดพลาดในระบบ ไม่สามารถเพิ่มพนักงานร้านค้าไอดีนี้ได้ค่ะ"
            });
        }

        //Validate ข้อมูลก่อน
        switch (true) {
            case !userStoreName || !userStorePassword:
                return res.status(400).send({
                    success: false,
                    msg: "กรุณาใส่ข้อมูลให้ครบถ้วนค่ะ"
                });
        }

        //หาว่าในร้านมีเจ้าของยัง ถ้าไม่ให้คนที่เพิ่มเข้ามาเป็นเจ้าของ ถ้ามีให้คนที่เพิ่มมาเป็นพนักงาน
        const findUserInStore = await UserStoreModel.findAll({
            where: {
                StoreInformation_storeId: StoreInformation_storeId,
            }
        });

        //ถ้าร้านมีคนอยู่แล้ว ที่เพิ่มเข้ามาเป็นเจ้าของ
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
        //ถ้าร้านไม่มีคนอยู่เลย คนที่เพิ่มมาเป็นพนักงาน
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
                success: true,
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

/* log in to store 
   ล็อกอินเข้ามาในร้าน
*/

app.post('/api/store/login-store', async (req, res) => {
    const { storeOwnEmail, storeOwnPassword } = req.body;
    try {
        const findUserStoreWithEmail = await StoreInformationModel.findAll({
            where: {
                storeOwnEmail: storeOwnEmail
            }
        });
        if (findUserStoreWithEmail.length != 0) {
            //collect password and compare 
            const hashedPassword = (findUserStoreWithEmail[0].storeOwnPassword);
            const passwordMatch = await bcrypt.compare(storeOwnPassword, hashedPassword);

            if (!passwordMatch) {
                return res.status(401).send({
                    success: false,
                    msg: 'รหัสผ่านไม่ถูกต้องค่ะ!'
                })
            }
            else {
                const userToken = jwt.sign({ customerId: findUserStoreWithEmail[0].id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' });

                const findUSerStore = await UserStoreModel.findAll({
                    where: {
                        StoreInformation_storeId: findUserStoreWithEmail[0].Package_packageId
                    }
                });
                let newStore = true;

                if (findUSerStore.length != 0) {
                    newStore = false;
                }

                return res.status(200).send({
                    success: true,
                    msg: 'ล็อกอินสำเร็จค่ะ',
                    data: [{
                        storeId: findUserStoreWithEmail[0].storeId,
                        storeName: findUserStoreWithEmail[0].storeName,
                        storeRemaining: findUserStoreWithEmail[0].storeRemaining,
                        packageId: findUserStoreWithEmail[0].Package_packageId,
                        newStore,
                        userToken
                    }]
                });

            }

        }
        else if (findUserStoreWithEmail.length == 0) {
            return res.status(401).send({
                success: false,
                msg: 'ไม่พบผู้ใช้อีเมลนี้ค่ะ!'
            });
        }
    }
    catch (errr) {
        console.log("Error: ", errr);
        return res.status(400).send({
            success: false,
            msg: "มีบางอย่างผิดพลาดกรุณาลองใหม่หรือติดต่อโพสยาหยี!"
        });
    }
});

/* log in to employee sale service
   ล็อกอินเข้าเป็นพนักงานขายในร้านเพื่อขายสินค้า
*/

app.post('/api/store/login-employee', async (req,res)=>{
    
});
module.exports = app;