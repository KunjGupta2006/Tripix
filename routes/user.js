const express=require('express');
const router=express.Router();
const User=require("../models/user.js");
const WrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require('../middleware.js');

const userController=require("../controllers/users.js");

router.route("/signup")
.get(userController.getsignupform)
.post(WrapAsync(userController.signUp));

router.route("/login")
.get(userController.getloginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}) ,userController.logIn);

//logout
router.get("/logout",userController.logout);

module.exports=router;