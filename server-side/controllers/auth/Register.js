/*
  @register store and owner store
*/

const express = require('express')
const app = express();

const bcrypt = require('bcrypt');
const util = require('util');
const StoreModel = require('../../models/StoreModel');
const UserModel = require('../../models/UserModel');

const saltRounds = 10;
const hashAsync = util.promisify(bcrypt.hash);

app.post('/api/v1/sign-up', async (req, res) => {
    const { package_id, store_name, user_fname, user_lname, user_email, user_password } = req.body;
    try {

        // Validate data
        if (!package_id || !store_name || !user_fname || !user_lname || !user_email || !user_password) {
            return res.status(400).json({
                success: false,
                msg: "กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!"
            });
        }

        // Check for existing store
        const existingEmail = await UserModel.findAll({
            where: {
                user_email: user_email
            }
        });

        if (existingEmail.length !== 0) {
            return res.status(409).json({
                success: false,
                msg: "อีเมลนี้ถูกใช้แล้วค่ะ!"
            });
        }

        // Hash the password
        const hash = await hashAsync(user_password, saltRounds);

        //create a new store
        let store_active = false;
        if (package_id === 1) {
            store_active = true
        }

        const newStore = {
            store_name,
            store_active: store_active,
            package_id
        }

        const store = await StoreModel.create(newStore);
        //create a new user
        const newUser = {
            user_fname,
            user_lname,
            user_email,
            user_password: hash,
            user_role: "owner",
            store_id: store.store_id
        };
        const user = await UserModel.create(newUser);

        return res.status(201).json({
            success: true,
            msg: "ลงทะเบียนร้านค้าเรียบร้อยค่ะ!",
        });

    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = app;