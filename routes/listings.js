const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");

const multer = require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const listingController=require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),validatelisting, wrapAsync(listingController.createlisting));

//create listing
router.get("/new", isLoggedIn,listingController.getnewform);

router.get("/category/:type",wrapAsync(listingController.category));
router.get("/search",wrapAsync(listingController.search));

router.route("/:id")
.get(wrapAsync(listingController.showlisting))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting, wrapAsync(listingController.updatelisting))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroylisting)) ;

//edit listing
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.rendereditform));


module.exports=router;