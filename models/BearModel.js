const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Bear = mongoose.model("Bear", bearSchema);

module.exports = Bear;