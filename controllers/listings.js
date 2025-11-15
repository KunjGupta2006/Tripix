const Listing=require("../models/listing.js");

module.exports.index=async (req,res)=> {
    const alllistings=await Listing.find({});
    res.render("listings/index.ejs",{alllistings});  
};

module.exports.getnewform=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showlisting=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate({path: "reviews",populate: {path:"author",}})
    .populate("owner");
    console.log(listing);
    if(!listing){req.flash("error","Requested Listing not found !"); return res.redirect("/listings");}
    res.render("listings/show.ejs",{listing});
};

module.exports.createlisting=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(req.body.listing);
    const listing=await new Listing(req.body.listing);
    listing.country=req.body.listing.country.toLowerCase();
    listing.owner=req.user._id;
    listing.image={url,filename};
    const {location,latitude,longitude}=req.body.listing.location;
    await listing.save();
    req.flash("success","New Listing created successfully!");
    res.redirect("/listings");
    console.log(listing);
};
module.exports.category=async(req,res)=>{
    let {type}=req.params;
    const alllistings=await Listing.find({category:`${type}`});
    console.dir(alllistings);
    res.render("listings/index.ejs",{alllistings});
}
module.exports.search=async(req,res)=>{
    try{
        let {q}=req.query;
        if(!q || q.trim()=="") return res.render("listings/index.ejs");
        const searchText=q.trim();

        const alllistings=await Listing.find({
            $or: [
                { title: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } },
                { location: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } }
            ]
        });
        console.log(alllistings);
        res.render("listings/index.ejs",{alllistings,query:q});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

module.exports.rendereditform=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){req.flash("error","Requested Listing not found !"); return  res.redirect("/listings");}

    let originalimageUrl=listing.image.url;
    originalimageUrl=originalimageUrl.replace("/upload","/upload/h_200,w_200,e_blur:50");
    res.render("./listings/edit",{listing,originalimageUrl});
};
module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    listing.country=req.body.listing.country.toUpperCase();
    if(typeof req.file!=='undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing edited successfully!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroylisting=async (req,res)=>{
    const {id}=req.params;
    const delitm=await Listing.findByIdAndDelete(id);
    if(!delitm){req.flash("error","no such listing to delete!");return  res.redirect("/listings");}
    console.log("ELEMENT DELETED: ",delitm);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");  
};