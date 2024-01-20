const express = require('express')
const app = express();
const PackageModel = require('../models/PackageModel');

//Add new packages
app.post('/api/package/add-package', async (req, res) => {
    try {
        const { package_price, package_name } = req.body;
        switch (true) {
            case package_price != 0 && !package_price || !package_name:
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