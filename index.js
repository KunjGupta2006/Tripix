if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const PORT=8080;
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require('./utils/ExpressError.js');
const listingsRouter=require('./routes/listings.js');
const reviewsRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("express-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const dburl=process.env.ATLAS_DB_URL;

// const dburl="mongodb://127.0.0.1:27017/Tripix";
main()
.then(()=>{console.log("mongo connected successfully.")})
.catch((e)=>{console.log("--ERROR--CONNECTING--MONGO--\n",e);});

async function main(){
    try {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

const store=MongoStore.create({
    mongoUrl: dburl,
    crypto:{ secret:process.env.SECRET},
    touchAfter: 24*3600
});
store.on("error",()=>{console.log("----ERROR IN MONGO SESSION STORE-----\n")});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized :true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000 ,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

//error handling
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("./error.ejs",{err}); 
});

app.listen(PORT,()=>{console.log(`server listening on port:${PORT}`);})