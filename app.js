const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


//databse connect
const url = 'mongodb://127.0.0.1:27017/travel';
main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(url);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    console.log("home page");
    res.send("root page");
});


//get listing route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
});

// show routes
app.get("/listings/:id", async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// create route
app.post("/listings", async (req, res) => {
    // let listing = req.body;
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// edit rout
app.get("/listings/:id/edit", async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//update route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings ${id}`);
});


//delete route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing ({
//         title : "My New Villa",
//         description : "By The Beach",
//         price : 1200,
//         location : "goa",
//         country : "India",
//     })

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("success testing")
// });


app.listen(8080, () => {
    console.log("8080 port is listening");
});