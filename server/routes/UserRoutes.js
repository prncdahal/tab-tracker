const express = require("express");
const router = express.Router();
const { Users } = require('../models');
const Joi = require('joi');
const { application } = require("express");



router.post("/register", async (req, res) => {
  // Creating schema for req validation
  const registerSchema = Joi.object({
  email: Joi.string().email().required('Email required'),
  password: Joi.string().min(3).max(10).required()
})
  try{
    const user = req.body;
    // validating request
    const {error,value} = registerSchema.validate(user);
    
    // if has error
    if(error){
      console.log(error.details[0].context.key);
      switch(error.details[0].context.key){
        case 'email':
          res.status(400).send({
            error:'You must provide a valid email address'
          })
        break
        case 'password':
          res.status(400).send({
            error:`1. lowercase,uppercase and number<br/>must be at least 8 characters or not greater than 20 character`
          })
        break
        default:
          res.status(400).send({
            error:'invalid registration information'
          })
      }
      // return res.status(400).send(error.details[0].message)
    } else{
      await Users.create(user)
      res.json(user)
    }
   
  } catch(e){
    res.status(400).send({
      error:"The email Account is already in use."
    })
  }
});

router.get('/',(req,res)=>{
  res.send('user router');
})



module.exports = router;