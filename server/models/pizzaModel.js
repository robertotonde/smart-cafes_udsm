const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },

    category: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },

    prices: [],
    varients: [],
  },
  { timestamp: true }
);

const pizzaModel = mongoose.model("pizzas", pizzaSchema);

module.exports = pizzaModel;
