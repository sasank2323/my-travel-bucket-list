const express=require("express");
const app=express();
const mongoose=require("mongoose");
const mongos_url='mongodb://127.0.0.1:27017/wanderlust'
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(()=>
{
    console.log("success");
}).catch(err=>{
    console.log(err);
})
async function main()
{
    await mongoose.connect(mongos_url);
}

app.get("/listings",async(req,res)=>{
    const all_listing=await listing.find({});
    console.log(all_listing);
    res.render("listings/index.ejs",{all_listing});
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listings=await listing.findById(id);
    res.render("listings/show.ejs",{listings});
})


//creating route
app.post("/listings",async(req,res)=>{
//let {title,description,image,price,country,location}=req.body; or you can import as object
let Listing=req.body.Listing;
const new_listing=new listing(Listing);
await new_listing.save();
res.redirect("/listings");

})

//edit and update we use both one is get(/listings/id/edit) put(/listings/id)

app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listings=await listing.findById(id);
    res.render("listings/edit.ejs",{listings});
});

//update by put method 

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listings/${id}`);

});

//delte route from show.ejs
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletelisting=await listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
})
























/*app.get("/testlisting",async(req,res)=>
{
    let samplelisting=new listing({
        title:"myhome",
        description:"my bear",
        price:200,
        location:"mumbai",
        country:"india"
    });
    await samplelisting.save();
    console.log("sample was saved");
    res.send("sucess");
})*/
app.listen(8080,()=>
{
    console.log("hi");
});
app.get("/",(req,res)=>{
    res.send("hi");
})