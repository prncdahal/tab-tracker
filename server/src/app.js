console.log('hello');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const db = require('../models')
const app = express();
app.use(morgan('combine'));
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
// Routes
const userRoutes = require('../routes/UserRoutes')
app.use('/auth',userRoutes)


db.sequelize.sync().then(()=>{
  app.listen(process.env.PORT || 8081,()=>{
    console.log('App is running on port 8081')
  })
})

