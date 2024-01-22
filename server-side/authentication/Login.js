/*
    @Login into store
*/

const express = require('express');
const app = express();
const UserModel = require('../models/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StoreModel = require('../models/StoreModel');

app.post('/api/v1/login', async (req, res) => {
    const { user_email, user_password } = req.body;
    try {
        //Validate data
        switch (true) {
            case !user_email || !user_password:
                return res.status(400).send({
                    success: false,
                    msg: "กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!"
                });
        }

        //find user email
        const user = await UserModel.findAll({
            where: {
                user_email: user_email
            }
        });

        //if found email
        if (user.length != 0) {
            //collect password and compare 
            const hashedPassword = (user[0].user_password);
            const passwordMatch = await bcrypt.compare(user_password, hashedPassword);

            //if password not match
            if (!passwordMatch) {
                return res.status(401).send({
                    success: false,
                    msg: 'รหัสผ่านไม่ถูกต้องค่ะ!'
                });
            }

            const store = await StoreModel.findAll({
                where: {
                    store_id: user[0].store_id
                },
                attributes: ['store_id','store_name', 'store_address', 'store_phone', 'store_taxid', 'store_remaining', 'store_active']
            })
            //send jwt to user
            const token = jwt.sign
                ({
                    store: store,
                    user: [{
                        user_id: user[0].user_id,
                        user_role: user[0].user_role,
                        user_fname: user[0].user_fname,
                        user_lname: user[0].user_lname,
                        user_image: user[0].user_image
                    }
                    ]
                },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' });

            const refreshToken = jwt.sign({
                store: store,
                user: [{
                    user_id: user[0].user_id,
                    user_role: user[0].user_role,
                    user_fname: user[0].user_fname,
                    user_lname: user[0].user_lname,
                    user_image: user[0].user_image
                }
                ]
            },
                process.env.JWT_SECRET,
                { expiresIn: '1d' });

            // Calculate the expiration date for 30 days from now
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            res.cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
                secure: true,
                httpOnly: true,
                sameSite: 'None',
                expires: expirationDate
            });

            return res.status(200).send({
                success: true,
                msg: `ล็อกอินสำเร็จค่ะ ${store[0].store_name}!`,
                store: store,
                user: [{
                    user_role: user[0].user_role,
                    user_fname: user[0].user_fname,
                    user_lname: user[0].user_lname,
                    user_image: user[0].user_image
                }
                ],
                refreshToken: refreshToken
            });
        }
        //if not found email
        else if (user.length == 0) {
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

module.exports = app;