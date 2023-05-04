var mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    poids: { type: Number, required: true },
    taille: { type: Number, required: true }
});

pokemonSchema.virtual("id").get(function () {
    return this._id;
});

pokemonSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
  
module.exports = mongoose.model("pokemons", pokemonSchema);