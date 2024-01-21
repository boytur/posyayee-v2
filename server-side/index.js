const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const auth = require("./authentication/authen");
const cookieParser = require('cookie-parser');

const StoreModel = require('./models/StoreModel');
const UserModel = require('./models/UserModel');
const ProductModel = require('./models/ProductModel');
const CreditModel = require('./models/CreditModel');
const ProductTypeModel = require('./models/ProductTypeModel');
const SoldHistorieModel = require('./models/SoldHistorieModel');
const SettingModel = require('./models/SettingModel');

//midleware configuration
app.use(morgan('dev'));
app.use(bodyParser.json());
const corsOptions = {
  origin: ['http://localhost:5173', 'https://demo-sale-v2.netlify.app', 'https://sale.posyayee.shop'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

//ทำให้ folder เป็น public
app.use(express.static('public'));

//default routes
app.get('/', auth.isLogedin, async (req, res) => {
  res.status(200).send({
    success: true,
    msg: "hihi"
  })
});

const PackageController = require('./controllers/packageController');
// const StoreInformationController = require('./controllers/storeInformationControllers');
app.use(PackageController);
// app.use(StoreInformationController);

const register = require("./authentication/Register");
const login = require("./authentication/Login");
const logout = require("./authentication/Logout");
const refresh = require("./authentication/Refresh");
app.use(register,login,logout,refresh);

app.listen(port, () => {
  console.log(`POSYAYEE-V2 app listening on port ${port}`)
});