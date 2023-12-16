const express = require('express')
const app = express();
const PackageModel = require('../models/PackageModel');

//Add new packages
app.post('/api/package/add-packgae', async (req, res) => {
    try {
        const { packagePrice, packageName } = req.body;
        console.log(req.body);
        switch (true) {
            case packagePrice != 0 && !packagePrice || !packageName:
                res.status(500).send({ msg: "กรุณาใส่ข้อมูลให้ครบถ้วนค่ะ!" });
                return;
        }
        const result = await PackageModel.create(req.body);
        res.status(200).send({ success: true, data: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, data: err });
    }
});
module.exports = app;