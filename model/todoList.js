const mongoose = require("mongoose")

const TodoLitSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
     quantity:{ 
         type: Number,
         required: true
        },
     price: {
         type: String,
         required: true
        }
 
})

module.exports = mongoose.model("todo", TodoLitSchema) 