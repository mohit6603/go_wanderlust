const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: { 
        filename: { 
            type: String, 
            default: "listingimage" 
        }, 
        url: { 
            type: String, 
            default: "https://unsplash.com/illustrations/a-snowy-landscape-with-a-cabin-and-a-stream-8tt_S12_Ul8" 
        } 
    },
    price: Number,
    location: String,
    country: String,
});

// Create the model
const Listing = mongoose.model("Listing", listingSchema);

// Export the model
module.exports = Listing;
