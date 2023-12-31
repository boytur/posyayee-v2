const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const auth = require("./authentication/authen");
const cookieParser = require('cookie-parser')

//midleware configuration
app.use(morgan('dev'));
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
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
const StoreInformationController = require('./controllers/storeInformationControllers');
app.use(PackageController);
app.use(StoreInformationController);

app.listen(port, () => {
  console.log(`POSYAYEE-V2 app listening on port ${port}`)
});