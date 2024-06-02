import mongoose from "mongoose";

const schema = mongoose.Schema

const ProductSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    gst:{

        type: Number,
        default:18
    },

    totalAmount:{
        type: Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

ProductSchema.pre("save", function(next){
    this.totalAmount = this.price * this.quantity;
    next();
})


export const Product = mongoose.model("Product", ProductSchema);