var mongoose = require("mongoose");

const dresseurSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

dresseurSchema.virtual("id").get(function () {
    return this._id;
});

dresseurSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
  
module.exports = mongoose.model("dresseurs", dresseurSchema);