const User=require("../models/user.js");

module.exports.getsignupform=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signUp=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);

        req.logIn(registeredUser,(err)=>{
            if(err) return next(err);
            req.flash("success","User created successfully!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};
module.exports.getloginForm=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.logIn=async(req,res)=>{
    req.flash("success","welcome Back to Tripix!");
    let redirecturl=res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
};
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err);}
        req.flash("success","user logged Out!");
        res.redirect("/listings");
    })
};