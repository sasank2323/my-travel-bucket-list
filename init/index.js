const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

const mongos_url = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(async () => {
    console.log("Connected to MongoDB");
    await initdb();
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect(mongos_url);
}

const initdb = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initdb(); // Call the initialization function
