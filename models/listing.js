const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingschema = new Schema({
  title: {
    type:  String,
    required:true,
  },
  description:String,
  image:
  {
    type:String,
    default:"https://plus.unsplash.com/premium_photo-1669048776605-28ea2e52ae66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
  },

  price:Number,
  location:String,
  country:String,
});

const listing =mongoose.model("listing",listingschema);
module.exports=listing;
