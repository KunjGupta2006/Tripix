const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

//mongo connection
const MONGO_URL="mongodb://127.0.0.1:27017/Tripix";
main()
.then(()=>{console.log("mongo connected successfully.")})
.catch((e)=>{console.log("--ERROR--CONNECTING--MONGO--",e);});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDb=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"691494207a4910dcbd65d8d9"}))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDb();