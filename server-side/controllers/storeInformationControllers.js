const express = require('express');
const app = express();
const StoreInformationModel = require('../models/StoreInformationModel');
const UserStoreModel = require('../models/UserStoreModel');

const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
const hashAsync = util.promisify(bcrypt.hash);
const jwt = require('jsonwebtoken');

const auth = require("../authentication/authen");
const decodeStoreId = require('../middleware/decodeStoreId');

//multer for uploading files
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadToB2 = require('../middleware/uploadB2');

/*sign up a new store
  สมัครร้านค้าใหม่
*/
app.post('/api/store/signup-store', async (req, res) => {
    const { Package_packageId, storeName, storeOwnEmail, storeOwnPassword } = req.body;
    try {
        // Validate data
        if (!Package_packageId || !storeName || !storeOwnEmail || !storeOwnPassword) {
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
app.post('/api/store/signup-employee', auth.isLogedin, upload.single('photo'), async (req, res) => {
    const storeId = decodeStoreId(req);
    const fileName = generateFileName();
    const imageURLs = req.file ? `${process.env.URL}${fileName}` : 'https://placehold.co/600x400/EEE/31343C';

    await addNewEmployee(req, imageURLs);

    if (!req.file) {
        console.log('Image not found!');
    } else {
        await uploadToB2(req.file.buffer, fileName, res);
    }

    async function addNewEmployee(req, imageURLs) {
        try {
            let { userStoreName, userStorePassword, userStoreRole } = req.body;

            //validate data
            switch (true) {
                case !userStoreName || !userStorePassword || !storeId:
                    return res.status(400).send({
                        success: false,
                        mgs: "กรุณาระบุข้อมูลให้ครบถ้วนค่ะ!"
                    });
            }

            //check if new user
            if (!userStoreRole) {
                userStoreRole = "owner";
            }

            //create new employee
            const newEmployee = {
                userStoreName,
                userStorePassword,
                userStoreImagePath: imageURLs,
                userStoreRole,
                StoreInformation_storeId: storeId
            };

            await UserStoreModel.create(newEmployee);
            return res.status(200).send({
                success: true,
                msg: `เพิ่ม ${userStoreRole} เรียบร้อยค่ะ`
            });
        }
        catch (err) {
            res.status(500).send({
                success: false,
                msg: "Couldn't create employee"
            })
            console.log("Err", err)
        }
    }
    function generateFileName() {
        return `img${Date.now()}`;
    }
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
            //send jwt to user
            const storeToken = jwt.sign
                ({
                    storeId: findUserStoreWithEmail[0].storeId,
                    storeName: findUserStoreWithEmail[0].storeName
                },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' });

            // Calculate the expiration date for 30 days from now
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            res.cookie('storeToken', storeToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
                secure: true,
                httpOnly: true,
                sameSite: 'None',
                expires: expirationDate
            });

            return res.status(200).send({
                success: true,
                msg: `ล็อกอินสำเร็จค่ะ ${findUserStoreWithEmail[0].storeName}`,
                storeName: `${findUserStoreWithEmail[0].storeName}`
            });
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

/* check logged in
   เช็คว่ายังล็อกอินอยู่หรือเปล่า
*/
const decodeStoreName = require('../middleware/decodeStoreName');
app.get('/api/store/logedin', auth.isLogedin, async (req, res) => {
    try {
        const storeId = decodeStoreId(req);
        const storeName = decodeStoreName(req);
        if (!storeId) {
            return res.status(401).send({
                success: false,
            });
        }

        res.status(200).send({
            success: true,
            storeName: storeName
        });
    }
    catch (err) {
        console.log("Err", err);
    }
});

/* log out
   ล็อกเอ้าท์ออกจากระบบ
*/
app.get("/api/store/logout", async (req, res) => {
    res.clearCookie('storeToken');
    res.status(200).send('Logout successful');
});

/* View saler 
   ดูคนขายในร้านทั้งหมด
*/
app.get('/api/store/view-employee', auth.isLogedin, async (req, res) => {
    try {
        const storeId = decodeStoreId(req);
        //find user in store by storeId
        if (storeId) {
            const findUserStore = await UserStoreModel.findAll({
                where: {
                    StoreInformation_storeId: storeId
                },
                attributes: ['userStoreId', 'userStoreName', 'userStoreImagePath', 'userStoreRole', 'StoreInformation_storeId']
            });
            res.status(200).send({
                success: true,
                userStore: findUserStore
            });
        }
        else {
            return res.status(404).send({
                success: false,
                msg: "คุกกี้ไม่ถูกต้องค่ะ!"
            });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            msg: "มีบางอย่างผิดพลาดกรุณาลองใหม่หรือติดต่อโพสยาหยี!"
        })
    }
});

/* log in to employee sale service
   ล็อกอินเข้าเป็นพนักงานขายในร้านเพื่อขายสินค้า
*/
app.post('/api/store/login-employee', auth.isLogedin, async (req, res) => {
    try {
        const storeId = decodeStoreId(req);
        const { userStoreName, userStorePassword } = req.body;

        //valiate data
        switch (true) {
            case !userStoreName || !userStorePassword:
                return res.status(400).send({
                    success: false,
                    msg: "กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!"
                });
            case !storeId:
                return res.status(404).send({
                    success: false,
                    msg: "คุกกี้ไม่ถูกต้องค่ะ!"
                });

        }

        const findUserStore = await UserStoreModel.findOne({
            where: {
                StoreInformation_storeId: storeId
            }
        });

        const passMatch = findUserStore.userStorePassword === userStorePassword
            && findUserStore.userStoreName === userStoreName;

        if (passMatch) {
            //send jwt to user
            const userToken = jwt.sign({
                storeId: findUserStore.StoreInformation_storeId,
                userStoreId: findUserStore.userStoreId,
                userStoreName: findUserStore.userStoreName
            },
                process.env.JWT_SECRET,
                { expiresIn: '30d' });

            // Calculate the expiration date for 30 days from now
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);

            res.cookie('userToken', userToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
                secure: true,
                httpOnly: true,
                sameSite: 'None',
                expires: expirationDate
            });

            return res.status(200).send({
                success: true,
                msg: `สวัสดีค่ะ ${findUserStore.userStoreName}`
            });
        }
        res.status(401).send({
            success: false,
            msg: 'รหัสผ่านไม่ถูกต้องค่ะ!'
        });
    }
    catch (err) {
        console.log("Error: ", err)
    }
});

/* check user logged in
   เช็คว่าร้านค้านี้มีคนขายเข้ามายัง
*/
const decodeUserStore = require('../middleware/decodeUserStore');
app.post('/api/store/logedin-employee', auth.isLogedin, async (req, res) => {
    try {
        const userDetail = decodeUserStore(req);
        if (!userDetail) {
            return res.status(404).send({
                success: false,
                msg: "คุกกี้ไม่ถูกต้องค่ะ!"
            });
        }
        return res.status(200).send({
            msg: 'success',
            userStoreName: userDetail?.userStoreName
        });
    }
    catch (err) {
        console.log("Error: ", err);
    }
});

/* logout employee
   ล็อกเอ้าท์คนขายออกจากระบบ
*/
app.post('/api/store/logout-employee', async (req, res) => {
    res.clearCookie('userToken');
    res.status(200).send({
        success: true,
        msg: 'Logged out employee successfully!'
    });
});

module.exports = app;