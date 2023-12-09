const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

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

//default routes
app.get('/', (req, res) => {
  res.status(200).send(`    
  <div style=" width: 100%; height: 90vh; display: flex; justify-content: center; align-items: center;">
    <div> 
      <img src="https://media.tenor.com/ZX95mDnlodwAAAAd/the-rock-sus-eye.gif" />
    </div>
  </div>`);
});

const packageController = require('./controllers/packageController');
app.use(packageController);
app.listen(port, () => {
  console.log(`POSYAYEE-V2 app listening on port ${port}`)
});