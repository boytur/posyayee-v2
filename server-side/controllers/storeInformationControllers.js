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
const PackageModel = require('../models/PackageModel');
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

app.post('/api/store/signup-employee', upload.single('photo'), async (req, res) => {
});

/* log in to store 
   ล็อกอินเข้ามาในร้าน
*/

app.post('/api/store/login-store', async (req, res) => {
    const { storeOwnEmail, storeOwnPassword } = req.body;
    try {
        //Validate data
        switch (true) {
            case !storeOwnEmail || !storeOwnPassword:
                return res.status(400).send({
                    success: false,
                    msg: "กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!"
                });
        }
        //find user email
        const findUserStoreWithEmail = await StoreInformationModel.findAll({
            where: {
                storeOwnEmail: storeOwnEmail
            }
        });
        //if found email
        if (findUserStoreWithEmail.length != 0) {
            //collect password and compare 
            const hashedPassword = (findUserStoreWithEmail[0].storeOwnPassword);
            const passwordMatch = await bcrypt.compare(storeOwnPassword, hashedPassword);

            //if password not match
            if (!passwordMatch) {
                return res.status(401).send({
                    success: false,
                    msg: 'รหัสผ่านไม่ถูกต้องค่ะ!'
                });
            }
            //if password match
            else {

                //send jwt to user
                const userToken = jwt.sign({ storeId: findUserStoreWithEmail[0].storeId },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' });
                
                //find user in store by storeId
                const findUserStore = await UserStoreModel.findAll({
                    where: {
                        StoreInformation_storeId: findUserStoreWithEmail[0].storeId
                    },
                    attributes: ['userStoreName']
                });

                // check if the user is new user
                let newStore = true;
                if (findUserStore.length != 0) {
                    newStore = false;
                }

                //Find package name
                const packageName = await PackageModel.findAll({
                    where: {
                        packageId: findUserStoreWithEmail[0].Package_packageId
                    }
                });

                // const decoded = jwt.verify(userToken,process.env.JWT_SECRET);
                return res.status(200).send({
                    success: true,
                    msg: 'ล็อกอินสำเร็จค่ะ',
                    data: [{
                        storeName: findUserStoreWithEmail[0].storeName,
                        storeRemaining: findUserStoreWithEmail[0].storeRemaining,
                        packageName: packageName[0].packageName,
                        newStore,
                        userStore: findUserStore,
                        userToken
                    }]
                });
            }
        }
        //if not found email
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

app.post('/api/store/login-employee', async (req, res) => {

});
module.exports = app;