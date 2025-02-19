const express = require ('express');
const router = express.Router();
const User = require('../models/User');

const passport= require('passport');

router.get('/users/signin',(req, res) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
}));

router.get('/users/signup', (req, res)=> {
    res.render('users/signup')
});

router.post('/users/signup', async (req,res)=> {
    const { name, email, password, confirm_password } = req.body;
    const errors=[];
    if(name.length<=0){
        errors.push({text:"please enter a name"})
    }
    if(password != confirm_password){
        errors.push({text:"Passwords don't match"});
    }
    if(password.length<4){
        errors.push({text: "Password to short"});
    }
    if(errors.length>0){
        res.render('users/signup', {errors, name, email, password, confirm_password });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            res.redirect('/users/signup');
            req.flash('error_msg','This email is already in use');
        }else{
        const newUser = new User({ name, email, password});
        newUser.password= await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('sucess_msg', 'You are registered');
        res.redirect('/users/signin');}
    }
});

module.exports = router;